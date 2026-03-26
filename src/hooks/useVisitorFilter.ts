import { useMemo } from 'react'
import type { VisitorRecord } from '@/types'
import { sortByDateDesc } from '@/lib/date-utils'

export type VisitorFilterTab = 'active' | 'history' | 'stats'

export interface UseVisitorFilterOptions {
  visitors: VisitorRecord[]
  search: string
  tab: VisitorFilterTab
}

/**
 * Custom hook to filter and search visitors based on tab and search query
 */
export function useVisitorFilter({ visitors, search, tab }: UseVisitorFilterOptions): VisitorRecord[] {
  return useMemo(() => {
    const query = search.trim().toLowerCase()
    
    // Filter by tab/status
    let list: VisitorRecord[] = []
    if (tab === 'active') {
      list = visitors.filter((v) => v.status === 'active')
    } else if (tab === 'history') {
      list = [...visitors]
    } else if (tab === 'stats') {
      list = []
    }

    // Sort history by date (most recent first)
    if (tab === 'history') {
      list.sort(sortByDateDesc)
    }

    // Apply search filter
    if (query && tab !== 'stats') {
      list = list.filter(
        (v) =>
          v.visitorName.toLowerCase().includes(query) ||
          v.destination.toLowerCase().includes(query) ||
          v.registeredBy.toLowerCase().includes(query)
      )
    }

    return list
  }, [visitors, tab, search])
}
