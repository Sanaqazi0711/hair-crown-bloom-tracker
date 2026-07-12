
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Droplets, Heart, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dailyHabits } from '@/lib/habits';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

type LogsByDate = Record<string, string[]>;

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logsByDate, setLogsByDate] = useState<LogsByDate>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch this month's saved logs whenever the visible month or user changes
  useEffect(() => {
    const fetchMonthLogs = async () => {
      if (!user) return;

      const rangeStart = toDateKey(new Date(year, month, 1));
      const rangeEnd = toDateKey(new Date(year, month + 1, 0));

      const { data, error } = await supabase
        .from('daily_logs')
        .select('log_date, completed_habits')
        .eq('user_id', user.id)
        .gte('log_date', rangeStart)
        .lte('log_date', rangeEnd);

      if (error) {
        console.error('Error fetching calendar logs:', error);
        return;
      }

      const map: LogsByDate = {};
      (data ?? []).forEach((row) => {
        map[row.log_date] = row.completed_habits ?? [];
      });
      setLogsByDate(map);
    };

    fetchMonthLogs();
  }, [user, year, month]);

  const getSpecialDays = (date: Date) => {
    const events = [];
    const day = date.getDate();

    if (day === 15 || day === 16) {
      events.push({ type: 'fullmoon', label: 'Full Moon Trim', icon: Moon, color: 'bg-lavender-100 text-lavender-700' });
    }
    if (day === 1 || day === 30) {
      events.push({ type: 'newmoon', label: 'New Moon Care', icon: Sun, color: 'bg-blush-100 text-blush-700' });
    }
    if (date.getDay() === 0) {
      events.push({ type: 'mask', label: 'Deep Repair Day', icon: Heart, color: 'bg-pastel-pink-100 text-pastel-pink-700' });
    }
    if (date.getDay() === 1 && day <= 7) {
      events.push({ type: 'detox', label: 'Monthly Detox', icon: Droplets, color: 'bg-green-100 text-green-700' });
    }

    return events;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const getDaysInMonth = () => {
    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isCurrentMonth = (date: Date) => date.getMonth() === month;

  const selectedHabits = selectedDate ? logsByDate[selectedDate] ?? [] : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">
            Hair Care Calendar
          </h1>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
            Plan your monthly hair care journey and track your daily progress over time.
          </p>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-full hover:bg-pastel-pink-50 text-pastel-pink-600 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold text-pastel-pink-700">
              {monthNames[month]} {year}
            </h2>

            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-full hover:bg-pastel-pink-50 text-pastel-pink-600 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-pastel-pink-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((date, index) => {
              const specialDays = getSpecialDays(date);
              const isCurrentMonthDay = isCurrentMonth(date);
              const isTodayDay = isToday(date);
              const dateKey = toDateKey(date);
              const habitsForDay = logsByDate[dateKey];
              const hasLog = habitsForDay && habitsForDay.length > 0;

              return (
                <div
                  key={index}
                  onClick={() => hasLog && setSelectedDate(dateKey)}
                  className={`min-h-[100px] p-2 border border-gray-100 transition-all duration-200 ${
                    isCurrentMonthDay ? 'bg-white hover:bg-pastel-pink-50' : 'bg-gray-50'
                  } ${isTodayDay ? 'ring-2 ring-pastel-pink-400 bg-pastel-pink-50' : ''} ${
                    hasLog ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentMonthDay ? 'text-pastel-pink-700' : 'text-gray-400'
                  } ${isTodayDay ? 'text-pastel-pink-800 font-bold' : ''}`}>
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {hasLog && (
                      <div className="text-xs px-2 py-1 rounded-full bg-pastel-pink-500 text-white flex items-center space-x-1 truncate font-semibold">
                        <Check className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{habitsForDay.length}/{dailyHabits.length} done</span>
                      </div>
                    )}
                    {specialDays.map((event, eventIndex) => {
                      const Icon = event.icon;
                      return (
                        <div
                          key={eventIndex}
                          className={`text-xs px-2 py-1 rounded-full ${event.color} flex items-center space-x-1 truncate`}
                        >
                          <Icon className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{event.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-pastel-pink-700 mb-4">Calendar Legend</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pastel-pink-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">Your Progress</div>
                <div className="text-sm text-pastel-pink-600">Click a day to see details</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center">
                <Moon className="h-4 w-4 text-lavender-700" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">Full Moon Trim</div>
                <div className="text-sm text-pastel-pink-600">Light trim for healthy ends</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pastel-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-pastel-pink-700" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">Deep Repair Day</div>
                <div className="text-sm text-pastel-pink-600">Weekly intensive care</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Droplets className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">Monthly Detox</div>
                <div className="text-sm text-pastel-pink-600">Cleanse and reset</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6">
          <div className="glass rounded-2xl p-6 text-center">
            <Heart className="h-8 w-8 text-pastel-pink-500 mx-auto mb-4 animate-heart-beat" />
            <h3 className="dancing-script text-2xl text-pastel-pink-700 mb-2">
              Timing is everything in hair care
            </h3>
            <p className="text-pastel-pink-600">
              Following lunar cycles and consistent weekly treatments can enhance your hair's natural growth patterns! 🌙✨
            </p>
          </div>
        </div>
      </div>

      {/* Day Detail Dialog */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent className="bg-white border-pastel-pink-200">
          <DialogHeader>
            <DialogTitle className="text-pastel-pink-700 dancing-script text-2xl">
              {selectedDate &&
                new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {dailyHabits.map((habit) => {
              const done = selectedHabits.includes(habit.id);
              return (
                <div
                  key={habit.id}
                  className={`flex items-center space-x-3 p-3 rounded-xl border ${
                    done
                      ? 'bg-pastel-pink-50 border-pastel-pink-300'
                      : 'bg-gray-50 border-gray-100 opacity-60'
                  }`}
                >
                  <span className="text-xl">{habit.icon}</span>
                  <span className={`flex-1 text-pastel-pink-700 ${done ? '' : 'line-through'}`}>
                    {habit.label}
                  </span>
                  {done && <Check className="h-4 w-4 text-pastel-pink-500" />}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
