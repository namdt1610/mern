import { useState, useEffect } from 'react'

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved
            ? saved === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(isDarkMode ? 'light' : 'dark')
        root.classList.add(isDarkMode ? 'dark' : 'light')
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const toggleTheme = () => setIsDarkMode(!isDarkMode)

    return { isDarkMode, toggleTheme }
}
