// src/components/LocalizedDate.jsx
import i18next from 'i18next';
import { format } from 'date-fns-jalali';

export function formatDate(dateInput) {
  const locale = i18next.language || 'en';
  const date = new Date(dateInput);

    if (locale === 'fa') {
    // Persian calendar + Persian formatting
    return format(date, 'yyyy/ MMMM dd'); // Example: 1404 مرداد 15
  }
// Fallback: Use native locale for English or others
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
