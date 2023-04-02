import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const addDays = (date: string, days: number) => {
  const result = dayjs(date).add(days, 'day');
  return result.format('YYYY-MM-DD');
};

export const formatDate = (date: string) => {
  return dayjs(date).locale('ru').format('D MMMM YYYY');
};

export const getDaysDifferent = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  return endDate.diff(startDate, 'day');
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
};

type WordForms = {
  one: string;
  two: string;
  five: string;
};

export const getNounForm = (number: number, forms: WordForms) => {
  const pluralRules = new Intl.PluralRules('ru');

  switch (pluralRules.select(number)) {
    case 'one':
      return forms.one;
    case 'few':
      return forms.two;
    default:
      return forms.five;
  }
};
