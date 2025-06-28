
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Scissors, Droplets, Heart } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
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
  
  const getSpecialDays = (date: Date) => {
    const events = [];
    const day = date.getDate();
    
    // Full Moon and New Moon approximations (simplified)
    if (day === 15 || day === 16) {
      events.push({ type: 'fullmoon', label: 'Full Moon Trim', icon: Moon, color: 'bg-lavender-100 text-lavender-700' });
    }
    if (day === 1 || day === 30) {
      events.push({ type: 'newmoon', label: 'New Moon Care', icon: Sun, color: 'bg-blush-100 text-blush-700' });
    }
    
    // Weekly masks (every Sunday)
    if (date.getDay() === 0) {
      events.push({ type: 'mask', label: 'Deep Repair Day', icon: Heart, color: 'bg-pastel-pink-100 text-pastel-pink-700' });
    }
    
    // Monthly detox (first Monday)
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
  
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">
            Hair Care Calendar
          </h1>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
            Plan your monthly hair care journey with special treatments, trims, and deep conditioning days.
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
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-100 transition-all duration-200 ${
                    isCurrentMonthDay ? 'bg-white hover:bg-pastel-pink-50' : 'bg-gray-50'
                  } ${isTodayDay ? 'ring-2 ring-pastel-pink-400 bg-pastel-pink-50' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentMonthDay ? 'text-pastel-pink-700' : 'text-gray-400'
                  } ${isTodayDay ? 'text-pastel-pink-800 font-bold' : ''}`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
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
              <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center">
                <Moon className="h-4 w-4 text-lavender-700" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">Full Moon Trim</div>
                <div className="text-sm text-pastel-pink-600">Light trim for healthy ends</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blush-100 rounded-full flex items-center justify-center">
                <Sun className="h-4 w-4 text-blush-700" />
              </div>
              <div>
                <div className="font-medium text-pastel-pink-700">New Moon Care</div>
                <div className="text-sm text-pastel-pink-600">Deep nourishing treatments</div>
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
    </div>
  );
};

export default Calendar;
