import { format, subDays, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';

export const getLast14DaysData = (data) => {
  const last14Days = eachDayOfInterval({
    start: subDays(new Date(), 13),
    end: new Date(),
  });

  const grouped = data.reduce((acc, item) => {
    const rawDate = new Date(item.createdAt);
    const key = format(rawDate, 'yyyy-MM-dd');
    acc[key] = (acc[key] || 0) + item.amount;
    return acc;
  }, {});

  const result = last14Days.map((date) => {
    const key = format(date, 'yyyy-MM-dd');
    const day = format(date, 'dd', { locale: es });
    const month = format(date, 'MMM', { locale: es });

    // Mayús primera letra del mes
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return {
      day: `${day} ${capitalizedMonth}`,
      amount: grouped[key] || 0,
    };
  });

  return result;
};