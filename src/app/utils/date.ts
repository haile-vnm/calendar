export function getWeeksInMonth(date: Date): Date[][] {
  const weeks: Date[][] = [];

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let current = new Date(firstDayOfMonth);
  current.setDate(current.getDate() - ((current.getDay() + 6) % 7)); // Start from Monday

  while (current <= lastDayOfMonth || current.getDay() !== 1) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export const shiftTime = (amount: number, unit: 'hour' | 'min', date: Date = new Date()): Date => {
  const newDate = new Date(date); // Create a new Date object to avoid mutating the original

  if (unit === 'hour') {
    newDate.setHours(newDate.getHours() + amount);
  } else if (unit === 'min') {
    newDate.setMinutes(newDate.getMinutes() + amount);
  }

  return newDate;
};

export const isEqualDate = (date: Date, compareDate: Date): boolean => {
  return (
    date.getFullYear() === compareDate.getFullYear() &&
    date.getMonth() === compareDate.getMonth() &&
    date.getDate() === compareDate.getDate()
  );
};
