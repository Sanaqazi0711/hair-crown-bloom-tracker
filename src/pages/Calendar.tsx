import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Droplets, Heart, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { dailyHabits, formatDateKey } from '@/lib/habits';

interface DailyLog {
  log_date: string;
  completed_habits: string[];
}

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState<Record<string, string[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (!user) return;
    const firstDay = formatDateKey(new Date(year, month, 1));
    const lastDay = formatDateKey(new Date(year, month + 1, 0));
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('daily_logs')
        .select('log_date, completed_habits')
        .eq('user_id', user.id)
        .gte('log_date', firstDay)
        .lte('log_date', lastDay);
      if (!cancelled && !error && data) {
        const map: Record<string, string[]> = {};
        (data as DailyLog[]).forEach(row => {
          map[row.log_date] = row.completed_habits || [];
        });
        setLogs(map);
      }
    })();
    return () => { cancelled = true; };
  }, [user, year, month]);

  const getSpecialDays = (date: Date) => {
    const events = [];
    const day = date.getDate();
    if (day === 15 || day === 16) events.push({ label: 'Full Moon Trim', icon: Moon, color: 'bg-lavender-100 text-lavender-700' });
    if (day === 1 || day === 30) events.push({ label: 'New Moon Care', icon: Sun, color: 'bg-blush-100 text-blush-700' });
    if (date.getDay() === 0) events.push({ label: 'Deep Repair Day', icon: Heart, color: 'bg-pastel-pink-100 text-pastel-pink-700' });
    if (date.getDay() === 1 && day <= 7) events.push({ label: 'Monthly Detox', icon: Droplets, color: 'bg-green-100 text-green-700' });
    return events;
  };

  const navigateMonth = (direction: number) => setCurrentDate(new Date(year, month + direction, 1));

  const days = useMemo(() => {
    const arr = [];
    const cur = new Date(startDate);
    for (let i = 0; i < 42; i++) { arr.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }
    return arr;
  }, [startDate.getTime()]);

  const isToday = (d: Date) => d.toDateString() === today.toDateString();
  const isCurrentMonth = (d: Date) => d.getMonth() === month;

  const selectedLog = selectedDate ? logs[selectedDate] || [] : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">Hair Care Calendar</h1>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
            Plan your monthly hair care journey with special treatments, trims, and deep conditioning days.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigateMonth(-1)} className="p-2 rounded-full hover:bg-pastel-pink-50 text-pastel-pink-600 transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-pastel-pink-700">{monthNames[month]} {year}</h2>
            <button onClick={() => navigateMonth(1)} className="p-2 rounded-full hover:bg-pastel-pink-50 text-pastel-pink-600 transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-pastel-pink-600">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const specialDays = getSpecialDays(date);
              const inMonth = isCurrentMonth(date);
              const todayDay = isToday(date);
              const key = formatDateKey(date);
              const log = logs[key];
              const hasLog = !!log && log.length > 0;

              return (
                <div
                  key={index}
                  onClick={() => hasLog && setSelectedDate(key)}
                  className={`min-h-[100px] p-2 border border-gray-100 transition-all duration-200 ${
                    inMonth ? 'bg-white hover:bg-pastel-pink-50' : 'bg-gray-50'
                  } ${todayDay ? 'ring-2 ring-pastel-pink-400 bg-pastel-pink-50' : ''} ${hasLog ? 'cursor-pointer' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    inMonth ? 'text-pastel-pink-700' : 'text-gray-400'
                  } ${todayDay ? 'text-pastel-pink-800 font-bold' : ''}`}>
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {hasLog && (
                      <div className="text-xs px-2 py-1 rounded-full bg-pastel-pink-200 text-pastel-pink-800 font-semibold flex items-center space-x-1">
                        <Heart className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{log.length}/{dailyHabits.length} done</span>
                      </div>
                    )}
                    {specialDays.map((event, i) => {
                      const Icon = event.icon;
                      return (
                        <div key={i} className={`text-xs px-2 py-1 rounded-full ${event.color} flex items-center space-x-1 truncate`}>
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

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-pastel-pink-700 mb-4">Calendar Legend</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center"><Moon className="h-4 w-4 text-lavender-700" /></div>
              <div><div className="font-medium text-pastel-pink-700">Full Moon Trim</div><div className="text-sm text-pastel-pink-600">Light trim for healthy ends</div></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blush-100 rounded-full flex items-center justify-center"><Sun className="h-4 w-4 text-blush-700" /></div>
              <div><div className="font-medium text-pastel-pink-700">New Moon Care</div><div className="text-sm text-pastel-pink-600">Deep nourishing treatments</div></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pastel-pink-100 rounded-full flex items-center justify-center"><Heart className="h-4 w-4 text-pastel-pink-700" /></div>
              <div><div className="font-medium text-pastel-pink-700">Deep Repair Day</div><div className="text-sm text-pastel-pink-600">Weekly intensive care</div></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"><Droplets className="h-4 w-4 text-green-700" /></div>
              <div><div className="font-medium text-pastel-pink-700">Monthly Detox</div><div className="text-sm text-pastel-pink-600">Cleanse and reset</div></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="glass rounded-2xl p-6 text-center">
            <Heart className="h-8 w-8 text-pastel-pink-500 mx-auto mb-4 animate-heart-beat" />
            <h3 className="dancing-script text-2xl text-pastel-pink-700 mb-2">Timing is everything in hair care</h3>
            <p className="text-pastel-pink-600">
              Following lunar cycles and consistent weekly treatments can enhance your hair's natural growth patterns! 🌙✨
            </p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDate} onOpenChange={(o) => !o && setSelectedDate(null)}>
        <DialogContent className="bg-gradient-to-br from-white to-pastel-pink-50 border-pastel-pink-200">
          <DialogHeader>
            <DialogTitle className="dancing-script text-3xl text-pastel-pink-700">
              {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            <p className="text-sm text-pastel-pink-600 mb-3">
              {selectedLog.length}/{dailyHabits.length} habits completed
            </p>
            {dailyHabits.map(habit => {
              const done = selectedLog.includes(habit.id);
              return (
                <div key={habit.id} className={`flex items-center space-x-3 p-3 rounded-xl border ${
                  done ? 'bg-pastel-pink-50 border-pastel-pink-300' : 'bg-white border-pastel-pink-100'
                }`}>
                  <span className="text-xl">{habit.icon}</span>
                  <span className={`flex-1 text-sm ${done ? 'text-pastel-pink-700 font-medium' : 'text-pastel-pink-400'}`}>
                    {habit.label}
                  </span>
                  {done && <Check className="h-5 w-5 text-pastel-pink-500" />}
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
