
import { useState, useEffect } from 'react';
import { Check, Heart, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const dailyHabits = [
  { id: 'fenugreek', label: 'Drink soaked fenugreek seed water', icon: '💧' },
  { id: 'nuts', label: 'Eat 5 almonds, 2 walnuts, 1 fig', icon: '🥜' },
  { id: 'sunlight', label: '15 mins sunlight exposure', icon: '☀️' },
  { id: 'water', label: '8-10 glasses of water', icon: '💦' },
  { id: 'protein', label: 'Protein-rich meal', icon: '🥗' },
  { id: 'gentle', label: 'No heat/no tight hairstyles', icon: '🚫' },
  { id: 'massage', label: '10 min scalp massage', icon: '💆‍♀️' },
  { id: 'inversion', label: '4 min inversion method', icon: '🙃' },
  { id: 'balayam', label: 'Balayam (nail rubbing)', icon: '💅' },
  { id: 'sleep', label: '7-9 hrs sleep (silk pillowcase)', icon: '😴' },
];

const DailyTracker = () => {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toDateString();
    setCurrentDate(today);
    
    // Load habits for today from localStorage
    const savedHabits = localStorage.getItem(`habits-${today}`);
    if (savedHabits) {
      setCompletedHabits(JSON.parse(savedHabits));
    }
  }, []);

  const toggleHabit = (habitId: string) => {
    const updated = completedHabits.includes(habitId)
      ? completedHabits.filter(id => id !== habitId)
      : [...completedHabits, habitId];
    
    setCompletedHabits(updated);
    localStorage.setItem(`habits-${currentDate}`, JSON.stringify(updated));
  };

  const resetDay = () => {
    setCompletedHabits([]);
    localStorage.removeItem(`habits-${currentDate}`);
  };

  const progress = (completedHabits.length / dailyHabits.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Crown className="h-12 w-12 text-pastel-pink-500 animate-bounce-gentle" />
          </div>
          
          <h1 className="dancing-script text-4xl md:text-5xl font-bold text-pastel-pink-700 mb-4">
            Daily Hair Love Tracker
          </h1>
          <p className="text-lg text-pastel-pink-600 mb-8">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          {/* Cute animated girl with long hair illustration */}
          <div className="max-w-md mx-auto mb-8">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format" 
              alt="Beautiful girl with long flowing hair" 
              className="rounded-3xl shadow-2xl mx-auto float w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 bg-gradient-to-br from-white/90 to-pastel-pink-50/80 border-pastel-pink-200 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-pastel-pink-500 animate-heart-beat" />
                <span className="text-lg font-semibold text-pastel-pink-700">
                  Today's Progress
                </span>
              </div>
              <span className="text-2xl font-bold text-pastel-pink-600">
                {completedHabits.length}/{dailyHabits.length}
              </span>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="text-center">
              {progress === 100 ? (
                <div className="flex items-center justify-center space-x-2 text-pastel-pink-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Perfect day! Your hair will thank you! 💕</span>
                  <Sparkles className="h-5 w-5" />
                </div>
              ) : (
                <p className="text-pastel-pink-600">
                  You're doing great! Keep going! ✨
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Habits List */}
        <Card className="mb-8 bg-pink-50 border-pink-200">
          <CardHeader>
            <CardTitle className="text-2xl text-pastel-pink-700 text-center">
              Daily Hair Growth Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {dailyHabits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    completedHabits.includes(habit.id)
                      ? 'bg-pastel-pink-50 border-pastel-pink-300 shadow-sm'
                      : 'bg-white border-pastel-pink-100 hover:border-pastel-pink-200'
                  }`}
                >
                  <Checkbox
                    id={habit.id}
                    checked={completedHabits.includes(habit.id)}
                    onCheckedChange={() => toggleHabit(habit.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{habit.icon}</span>
                    <label
                      htmlFor={habit.id}
                      className={`text-lg font-medium cursor-pointer ${
                        completedHabits.includes(habit.id)
                          ? 'text-pastel-pink-700 line-through'
                          : 'text-pastel-pink-600'
                      }`}
                    >
                      {habit.label}
                    </label>
                  </div>
                  {completedHabits.includes(habit.id) && (
                    <Check className="h-5 w-5 text-pastel-pink-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="text-center">
          <Button
            onClick={resetDay}
            variant="outline"
            className="border-pastel-pink-300 text-pastel-pink-600 hover:bg-pastel-pink-50"
          >
            Reset Today's Progress
          </Button>
        </div>

        {/* Motivational Quote */}
        <div className="mt-12 text-center">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <p className="dancing-script text-2xl text-pastel-pink-700 mb-4">
              "Every small step you take today is a gift to your future beautiful hair."
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="h-4 w-4 text-pastel-pink-400 animate-heart-beat" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;
