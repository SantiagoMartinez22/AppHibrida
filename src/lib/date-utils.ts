import { DEFAULT_LOCALE, MILLISECONDS_PER_HOUR } from '@/constants'

/**
 * Formats a date string or Date object to a localized date-time format
 */
export function formatDateTime(date: string | Date, locale: string = DEFAULT_LOCALE): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return formatter.format(new Date(date))
}

/**
 * Formats a date string or Date object to a localized time format
 */
export function formatTime(date: string | Date, locale: string = DEFAULT_LOCALE): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return formatter.format(new Date(date))
}

/**
 * Checks if a date string or Date object is today
 */
export function isToday(date: string | Date): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
}

/**
 * Checks if a date string or Date object is within the last hour
 */
export function isWithinLastHour(date: string | Date): boolean {
  const d = new Date(date).getTime()
  const now = Date.now()
  return now - d <= MILLISECONDS_PER_HOUR
}

/**
 * Converts a date to a local date key string (YYYY-MM-DD)
 */
export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Comparator function to sort items by createdAt date in descending order
 */
export function sortByDateDesc<T extends { createdAt: string }>(a: T, b: T): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}
