function getTimezoneOffset(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = dtf.formatToParts(date);
  const filled = Object.fromEntries(parts.map(p => [p.type, p.value]));

  const local = new Date(
    `${filled.year}-${filled.month}-${filled.day}T${filled.hour}:${filled.minute}:${filled.second}`,
  );

  return date.getTime() - local.getTime();
}

export function convertToUtc(date: Date, timeZone: string): Date {
  const offset = getTimezoneOffset(date, timeZone);
  return new Date(date.getTime() + offset);
}
