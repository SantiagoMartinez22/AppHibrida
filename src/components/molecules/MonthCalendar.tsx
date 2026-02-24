import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { cn } from '@/lib/utils'

export interface MonthCalendarProps {
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
  className?: string
}

const DAYS_OF_WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function MonthCalendar({
  onDateSelect,
  selectedDate,
  className,
}: MonthCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate ?? new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  // Convert Sunday (0) to 7 for Monday-first week
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Build calendar grid
  const calendarDays: (number | null)[] = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null)
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (day: number) => {
    const selected = new Date(year, month, day)
    if (onDateSelect) {
      onDateSelect(selected)
    }
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      {/* Month/Year header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-accent rounded transition-colors"
          aria-label="Mes anterior"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-accent rounded transition-colors"
          aria-label="Mes siguiente"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day, idx) => (
          <div
            key={`${day}-${idx}`}
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className="aspect-square flex items-center justify-center"
          >
            {day !== null ? (
              <button
                type="button"
                onClick={() => handleDayClick(day)}
                className={cn(
                  'w-full h-full rounded flex items-center justify-center text-sm transition-colors',
                  isToday(day)
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent'
                )}
              >
                {day}
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
