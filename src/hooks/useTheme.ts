import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, persistTheme, type ThemeMode } from '@/lib/theme'

export function useTheme() {
    const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())

    useEffect(() => {
        applyTheme(theme)
        persistTheme(theme)
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
    }, [])

    return {
        theme,
        isDark: theme === 'dark',
        setTheme,
        toggleTheme,
    }
}
