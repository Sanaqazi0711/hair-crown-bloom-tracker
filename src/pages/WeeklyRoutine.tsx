
import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Leaf, Droplets, Heart } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface WeeklyDay {
  day: string;
  title: string;
  color: string;
  icon: any;
  totalTime: string;
  tasks: {
    task: string;
    time: string;
    ingredients?: string[];
  }[];
}

const WeeklyRoutine = () => {
  const [openDays, setOpenDays] = useState<string[]>(['Monday']);

  const weeklyRoutine: WeeklyDay[] = [
    {
      day: 'Monday',
      title: 'Oiling & Detox',
      color: 'from-pastel-pink-400 to-pastel-pink-500',
      icon: Droplets,
      totalTime: '1.5 hours',
      tasks: [
        {
          task: 'Apply warm coconut + castor + rosemary oil mix',
          time: '10 mins',
          ingredients: ['Coconut oil', 'Castor oil', 'Rosemary essential oil']
        },
        {
          task: 'Massage scalp for deep circulation',
          time: '15 mins'
        },
        {
          task: 'Cover with hot towel steam',
          time: '10 mins'
        },
        {
          task: 'Shampoo (sulfate-free) after 1 hour',
          time: '15 mins'
        },
        {
          task: 'Apple cider vinegar rinse',
          time: '5 mins',
          ingredients: ['Apple cider vinegar', 'Water']
        },
        {
          task: 'Dry with soft cotton tee',
          time: '10 mins'
        },
        {
          task: 'Optional: spray clove water before bed',
          time: '2 mins',
          ingredients: ['Clove water']
        }
      ]
    },
    {
      day: 'Tuesday',
      title: 'Serum & Scalp Stimulation',
      color: 'from-lavender-400 to-lavender-500',
      icon: Leaf,
      totalTime: '45 minutes',
      tasks: [
        {
          task: 'Aloe vera + lavender serum as leave-in',
          time: '5 mins',
          ingredients: ['Aloe vera gel', 'Lavender essential oil']
        },
        {
          task: 'Drink hibiscus or green tea',
          time: '10 mins'
        },
        {
          task: 'Yoga: shoulder stand or scalp stretches',
          time: '15 mins'
        },
        {
          task: 'Inversion massage at night',
          time: '10 mins'
        },
        {
          task: 'Brush hair with wide-tooth comb',
          time: '5 mins'
        }
      ]
    },
    {
      day: 'Wednesday',
      title: 'Protein Repair',
      color: 'from-blush-400 to-blush-500',
      icon: Heart,
      totalTime: '1 hour',
      tasks: [
        {
          task: 'Hair mask: egg + curd + olive oil',
          time: '40 mins',
          ingredients: ['Egg', 'Curd', 'Olive oil']
        },
        {
          task: 'Warm towel wrap',
          time: '10 mins'
        },
        {
          task: 'Mild wash (no hot water)',
          time: '10 mins'
        },
        {
          task: 'Post-wash: rose water spray',
          time: '2 mins',
          ingredients: ['Rose water']
        },
        {
          task: 'Meditation / stress release activity',
          time: '10 mins'
        }
      ]
    },
    {
      day: 'Thursday',
      title: 'Hydration Day',
      color: 'from-pastel-pink-300 to-pastel-pink-400',
      icon: Droplets,
      totalTime: '30 minutes',
      tasks: [
        {
          task: 'Aloe vera gel on scalp',
          time: '30 mins',
          ingredients: ['Fresh aloe vera gel']
        },
        {
          task: 'Drink chia/lemon detox water',
          time: '5 mins'
        },
        {
          task: 'Apply hydrating hair mist: rose + lavender oil',
          time: '3 mins',
          ingredients: ['Rose water', 'Lavender oil']
        },
        {
          task: 'Use satin scarf at night',
          time: '1 min'
        }
      ]
    },
    {
      day: 'Friday',
      title: 'Herbal Hair Mask',
      color: 'from-lavender-300 to-lavender-400',
      icon: Leaf,
      totalTime: '1.5 hours',
      tasks: [
        {
          task: 'Bhringraj + methi + aloe mask',
          time: '45 mins',
          ingredients: ['Bhringraj powder', 'Fenugreek powder', 'Aloe vera gel']
        },
        {
          task: 'Gentle shampoo: reetha/shikakai',
          time: '15 mins',
          ingredients: ['Reetha', 'Shikakai']
        },
        {
          task: 'Rice water rinse (optional)',
          time: '5 mins',
          ingredients: ['Rice water']
        },
        {
          task: 'Evening inversion + gentle scalp brushing',
          time: '10 mins'
        }
      ]
    },
    {
      day: 'Saturday',
      title: 'Growth Boost',
      color: 'from-blush-300 to-blush-400',
      icon: Heart,
      totalTime: '1 hour',
      tasks: [
        {
          task: 'Onion juice + tea tree oil',
          time: '30 mins',
          ingredients: ['Onion juice', 'Tea tree oil']
        },
        {
          task: 'Shampoo with cold water',
          time: '15 mins'
        },
        {
          task: 'Massage scalp with fingertips',
          time: '10 mins'
        },
        {
          task: 'Practice yoga or breathing for circulation',
          time: '15 mins'
        }
      ]
    },
    {
      day: 'Sunday',
      title: 'Deep Repair & Self-Care',
      color: 'from-pastel-pink-500 to-pastel-pink-600',
      icon: Heart,
      totalTime: '2 hours',
      tasks: [
        {
          task: 'Apply shea butter + almond oil cream',
          time: '10 mins',
          ingredients: ['Shea butter', 'Almond oil']
        },
        {
          task: 'Sugar + oil scalp scrub',
          time: '15 mins',
          ingredients: ['Brown sugar', 'Coconut oil']
        },
        {
          task: 'Light trim (¼ inch) if needed',
          time: '15 mins'
        },
        {
          task: 'Aromatherapy: lavender oil diffuser',
          time: '30 mins'
        },
        {
          task: 'Self-care journaling',
          time: '20 mins'
        }
      ]
    }
  ];

  const toggleDay = (day: string) => {
    setOpenDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">
            Weekly Hair Ritual
          </h1>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
            Your detailed 7-day journey to healthier, stronger, and more beautiful hair. 
            Each day focuses on a different aspect of hair care for complete nourishment.
          </p>
        </div>

        {/* Weekly Routine Cards */}
        <div className="space-y-4">
          {weeklyRoutine.map((dayRoutine) => {
            const Icon = dayRoutine.icon;
            const isOpen = openDays.includes(dayRoutine.day);
            
            return (
              <Collapsible key={dayRoutine.day} open={isOpen} onOpenChange={() => toggleDay(dayRoutine.day)}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${dayRoutine.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-pastel-pink-700">
                            {dayRoutine.day} - {dayRoutine.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-pastel-pink-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{dayRoutine.totalTime}</span>
                            </div>
                            <span>•</span>
                            <span>{dayRoutine.tasks.length} steps</span>
                          </div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-pastel-pink-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-pastel-pink-500" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 border-t border-pastel-pink-100">
                      <div className="space-y-4 mt-4">
                        {dayRoutine.tasks.map((task, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50/50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pastel-pink-100 to-pastel-pink-200 rounded-full flex items-center justify-center text-sm font-semibold text-pastel-pink-700">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-pastel-pink-700 mb-1">{task.task}</h4>
                              <div className="flex items-center space-x-3 text-sm text-pastel-pink-600">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{task.time}</span>
                                </div>
                                {task.ingredients && (
                                  <>
                                    <span>•</span>
                                    <div className="flex flex-wrap gap-1">
                                      {task.ingredients.map((ingredient, i) => (
                                        <span key={i} className="bg-pastel-pink-100 text-pastel-pink-700 px-2 py-1 rounded-full text-xs">
                                          {ingredient}
                                        </span>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-8">
          <div className="glass rounded-2xl p-6 text-center">
            <Heart className="h-8 w-8 text-pastel-pink-500 mx-auto mb-4 animate-heart-beat" />
            <h3 className="dancing-script text-2xl text-pastel-pink-700 mb-2">
              Remember, beautiful hair is a journey, not a destination
            </h3>
            <p className="text-pastel-pink-600">
              Be patient with yourself and celebrate small wins. Consistency beats perfection every time! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyRoutine;
