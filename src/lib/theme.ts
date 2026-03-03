export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'vigilog-theme'

function isThemeMode(value: string | null): value is ThemeMode {
    return value === 'light' || value === 'dark'
}

export function getStoredTheme(): ThemeMode | null {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(value) ? value : null
}

export function getPreferredTheme(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getInitialTheme(): ThemeMode {
    return getStoredTheme() ?? getPreferredTheme()
}

export function applyTheme(mode: ThemeMode): void {
    document.documentElement.classList.toggle('dark', mode === 'dark')
}

export function persistTheme(mode: ThemeMode): void {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
}

export function initTheme(): ThemeMode {
    const theme = getInitialTheme()
    applyTheme(theme)
    return theme
}
