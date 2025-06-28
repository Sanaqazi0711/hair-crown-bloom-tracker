
import { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronLeft, ChevronRight, Crown, Sun } from 'lucide-react';

const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const hairTips = [
    {
      tip: "Brush your scalp, not just your hair.",
      explanation: "Gentle scalp brushing stimulates blood circulation and distributes natural oils. Use a boar bristle brush or your fingertips to massage in circular motions.",
      icon: Heart,
      color: "from-pastel-pink-400 to-pastel-pink-500"
    },
    {
      tip: "Sleep in braids to avoid friction.",
      explanation: "Loose braids or silk scarves protect your hair from pillow friction while you sleep. This prevents breakage and keeps your hair smooth.",
      icon: Crown,
      color: "from-lavender-400 to-lavender-500"
    },
    {
      tip: "Oiling is love — not just tradition.",
      explanation: "Regular oil massages nourish your scalp, strengthen hair roots, and create a protective barrier. Warm oils penetrate better and feel amazing!",
      icon: Sparkles,
      color: "from-blush-400 to-blush-500"
    },
    {
      tip: "Scalp is skin, not soil — treat it gently.",
      explanation: "Your scalp needs the same care as your face. Avoid harsh scrubbing, use gentle products, and keep it clean but not over-washed.",
      icon: Heart,
      color: "from-pastel-pink-300 to-pastel-pink-400"
    },
    {
      tip: "Stress = hair loss. Smile often 💕",
      explanation: "Chronic stress directly impacts hair growth cycles. Practice meditation, deep breathing, or whatever brings you joy. Happy mind, happy hair!",
      icon: Sun,
      color: "from-lavender-300 to-lavender-400"
    },
    {
      tip: "Cold water is your hair's best friend.",
      explanation: "Rinse with cool water to seal hair cuticles, lock in moisture, and add natural shine. Hot water strips oils and leaves hair dry.",
      icon: Sparkles,
      color: "from-blush-300 to-blush-400"
    },
    {
      tip: "Trim with intention, not fear.",
      explanation: "Regular light trims (¼ inch every 6-8 weeks) prevent split ends from traveling up. Think of it as pruning a plant for better growth!",
      icon: Crown,
      color: "from-pastel-pink-500 to-pastel-pink-600"
    },
    {
      tip: "Your hair reflects your inner health.",
      explanation: "Beautiful hair starts from within. Eat protein-rich foods, stay hydrated, get enough sleep, and take your vitamins. Nourish yourself completely.",
      icon: Heart,
      color: "from-lavender-500 to-lavender-600"
    },
    {
      tip: "Patience is the ultimate hair growth secret.",
      explanation: "Hair grows about ½ inch per month naturally. Trust the process, stay consistent with care, and celebrate small improvements along the way.",
      icon: Sparkles,
      color: "from-blush-500 to-blush-600"
    },
    {
      tip: "Love your hair at every length.",
      explanation: "Whether short or long, damaged or healthy, your hair is beautiful right now. Self-love and acceptance accelerate positive changes.",
      icon: Crown,
      color: "from-pastel-pink-400 to-pastel-pink-600"
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % hairTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + hairTips.length) % hairTips.length);
  };

  // Auto-rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(nextTip, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentTipData = hairTips[currentTip];
  const Icon = currentTipData.icon;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="dancing-script text-5xl font-bold text-pastel-pink-700 mb-4">
            Hair Growth Wisdom
          </h1>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
            Professional tips and ancient wisdom to guide your hair care journey. 
            These are the secrets that make all the difference! ✨
          </p>
        </div>

        {/* Main Tip Carousel */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 min-h-[400px] flex items-center">
            <div className="w-full text-center">
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r ${currentTipData.color} flex items-center justify-center transform rotate-12`}>
                <Icon className="h-10 w-10 text-white" />
              </div>

              {/* Tip */}
              <h2 className="dancing-script text-4xl md:text-5xl font-bold text-pastel-pink-700 mb-6 leading-tight">
                "{currentTipData.tip}"
              </h2>

              {/* Explanation */}
              <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto leading-relaxed mb-8">
                {currentTipData.explanation}
              </p>

              {/* Tip Counter */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                {hairTips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTip 
                        ? 'bg-pastel-pink-500 scale-125' 
                        : 'bg-pastel-pink-200 hover:bg-pastel-pink-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTip}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-pastel-pink-600 hover:text-pastel-pink-700 hover:shadow-xl transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextTip}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-pastel-pink-600 hover:text-pastel-pink-700 hover:shadow-xl transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* All Tips Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-pastel-pink-700 text-center mb-6">
            All Hair Growth Wisdom
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {hairTips.map((tip, index) => {
              const TipIcon = tip.icon;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    index === currentTip
                      ? 'bg-gradient-to-r from-pastel-pink-50 to-white ring-2 ring-pastel-pink-300 shadow-lg'
                      : 'bg-white hover:bg-pastel-pink-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center`}>
                      <TipIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-pastel-pink-700 mb-2 text-sm leading-tight">
                        {tip.tip}
                      </h4>
                      <p className="text-xs text-pastel-pink-600 line-clamp-2">
                        {tip.explanation}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="glass rounded-2xl p-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pastel-pink-500 animate-heart-beat" />
            <Sparkles className="h-6 w-6 text-lavender-500 animate-bounce-gentle" />
            <Crown className="h-6 w-6 text-blush-500 animate-heart-beat" />
          </div>
          <h3 className="dancing-script text-3xl text-pastel-pink-700 mb-4">
            Remember, beautiful soul...
          </h3>
          <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto leading-relaxed">
            Your hair growth journey is unique and beautiful. These tips are your companions, 
            not rules. Listen to your hair, trust your intuition, and shower yourself with love every step of the way. 
            You've got this! 💕✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tips;
