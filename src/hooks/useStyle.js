import { useContext } from 'react'
import { ThemeContext } from '../context'

export default function useGraphQL() {
  const { setTheme, styles, theme } = useContext(ThemeContext)

  return {
    setTheme,
    styles,
    theme
  }
}
