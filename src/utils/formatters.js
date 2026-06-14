export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date instanceof Date ? date : new Date(date));
}

export function isWithinCurrentWeek(date) {
  const target = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const start = new Date(now);
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);

  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return target >= start && target < end;
}

export function isWithinCurrentMonth(date) {
  const target = date instanceof Date ? date : new Date(date);
  const now = new Date();

  return (
    target.getMonth() === now.getMonth() &&
    target.getFullYear() === now.getFullYear()
  );
}
