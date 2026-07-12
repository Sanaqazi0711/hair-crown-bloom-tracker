export interface DailyHabit {
  id: string;
  label: string;
  icon: string;
}

export const dailyHabits: DailyHabit[] = [
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

export const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
