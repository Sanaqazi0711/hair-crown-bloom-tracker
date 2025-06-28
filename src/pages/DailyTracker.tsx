
import { useState, useEffect } from 'react';
import { Heart, Sun, Droplets, Apple, Moon, Hand } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DailyHabit {
  id: string;
  name: string;
  icon: any;
  completed: boolean;
  description: string;
}

const DailyTracker = () => {
  const [habits, setHabits] = useState<DailyHabit[]>([
    {
      id: 'fenugreek',
      name: 'Drink soaked fenugreek seed water',
      icon: Droplets,
      completed: false,
      description: 'Soak overnight, drink in the morning for hair strength'
    },
    {
      id: 'nuts',
      name: 'Eat 5 almonds, 2 walnuts, 1 fig',
      icon: Apple,
      completed: false,
      description: 'Rich in vitamins and minerals for hair growth'
    },
    {
      id: 'sunlight',
      name: '15 mins sunlight',
      icon: Sun,
      completed: false,
      description: 'Natural vitamin D for healthy hair follicles'
    },
    {
      id: 'water',
      name: '8-10 glasses water',
      icon: Droplets,
      completed: false,
      description: 'Hydration is key for hair health'
    },
    {
      id: 'protein',
      name: 'Protein-rich meal',
      icon: Apple,
      completed: false,
      description: 'Hair is made of protein - feed it well!'
    },
    {
      id: 'no-heat',
      name: 'No heat/tight hairstyles',
      icon: Heart,
      completed: false,
      description: 'Protect your hair from damage'
    },
    {
      id: 'massage',
      name: '10 min scalp massage',
      icon: Hand,
      completed: false,
      description: 'Stimulate blood circulation to hair roots'
    },
    {
      id: 'inversion',
      name: '4 min inversion method',
      icon: Heart,
      completed: false,
      description: 'Hang head upside down to boost circulation'
    },
    {
      id: 'balayam',
      name: 'Balayam (nail rubbing)',
      icon: Hand,
      completed: false,
      description: 'Rub nails together for hair growth stimulation'
    },
    {
      id: 'sleep',
      name: '7-9 hrs sleep (silk pillowcase)',
      icon: Moon,
      completed: false,
      description: 'Quality sleep on silk prevents hair breakage'
    }
  ]);

  // Load saved progress from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedHabits = localStorage.getItem(`daily-habits-${today}`);
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`daily-habits-${today}`, JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const progressPercentage = (completedCount / habits.length) * 100;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">
            Daily Hair Love Tracker
          </h1>
          <p className="text-lg text-pastel-pink-600 mb-2">{today}</p>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-5 w-5 text-pastel-pink-500" />
            <span className="text-pastel-pink-600">
              {completedCount} of {habits.length} habits completed
            </span>
            <Heart className="h-5 w-5 text-pastel-pink-500" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-pastel-pink-700">Today's Progress</span>
            <span className="text-2xl font-bold text-pastel-pink-600">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <p className="text-sm text-pastel-pink-600 text-center">
            {progressPercentage === 100 
              ? "🎉 Amazing! You've completed all your hair care habits today!" 
              : "Keep going! Every small step counts towards beautiful hair."}
          </p>
        </div>

        {/* Habits Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => {
            const Icon = habit.icon;
            return (
              <div
                key={habit.id}
                className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  habit.completed 
                    ? 'ring-2 ring-pastel-pink-400 bg-gradient-to-br from-pastel-pink-50 to-white' 
                    : 'hover:scale-[1.02]'
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    habit.completed 
                      ? 'bg-pastel-pink-500 text-white' 
                      : 'bg-pastel-pink-100 text-pastel-pink-600'
                  }`}>
                    {habit.completed ? (
                      <Heart className="h-6 w-6 animate-heart-beat" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 transition-colors ${
                      habit.completed 
                        ? 'text-pastel-pink-700 line-through' 
                        : 'text-pastel-pink-700'
                    }`}>
                      {habit.name}
                    </h3>
                    <p className="text-sm text-pastel-pink-600 leading-relaxed">
                      {habit.description}
                    </p>
                  </div>
                  
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    habit.completed 
                      ? 'bg-pastel-pink-500 border-pastel-pink-500' 
                      : 'border-pastel-pink-300 hover:border-pastel-pink-400'
                  }`}>
                    {habit.completed && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivation */}
        <div className="mt-8 text-center">
          <div className="glass rounded-2xl p-6">
            <p className="dancing-script text-2xl text-pastel-pink-700 mb-2">
              "Consistency is the mother of mastery"
            </p>
            <p className="text-pastel-pink-600">
              Every habit you complete today is an investment in tomorrow's beautiful hair! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;
