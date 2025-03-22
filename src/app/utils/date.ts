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

export const createDateFrom = (date: Date, time: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  )
}

export function getWeekDates(date: Date): Date[] {
  const week: Date[] = [];
  // to avoid modifying original date
  const inputDate = new Date(date);

  // Calculate the Monday of the current week
  const dayOfWeek = inputDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const mondayOffset = (dayOfWeek + 6) % 7; // Convert Sunday (0) to 6, Monday (1) to 0, etc.

  inputDate.setDate(inputDate.getDate() - mondayOffset); // Move to Monday

  // Collect 7 days from Monday to Sunday
  for (let i = 0; i < 7; i++) {
    week.push(new Date(inputDate));
    inputDate.setDate(inputDate.getDate() + 1);
  }

  return week;
}
