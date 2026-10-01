import { dealership, type DealershipHours } from '../data/dealership';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function easternNow(): {day: number;minutes: number;} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23'
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
  return { day: day < 0 ? 1 : day, minutes: hour * 60 + minute };
}

export function hoursForDay(day: number): DealershipHours {
  return dealership.hours.find((h) => h.days.includes(day)) ?? dealership.hours[0];
}

export function getOpenStatus(): {isOpen: boolean;label: string;today: DealershipHours;} {
  const { day, minutes } = easternNow();
  const today = hoursForDay(day);

  if (today.openMinutes !== null && today.closeMinutes !== null) {
    if (minutes >= today.openMinutes && minutes < today.closeMinutes) {
      return { isOpen: true, label: `Open today until ${today.close}`, today };
    }
    if (minutes < today.openMinutes) {
      return { isOpen: false, label: `Opens today at ${today.open}`, today };
    }
  }

  for (let i = 1; i <= 7; i += 1) {
    const next = (day + i) % 7;
    const h = hoursForDay(next);
    if (h.open) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[next];
      return { isOpen: false, label: `Closed now · Opens ${when} at ${h.open}`, today };
    }
  }
  return { isOpen: false, label: 'Closed', today };
}

export function todayIndex(): number {
  return easternNow().day;
}