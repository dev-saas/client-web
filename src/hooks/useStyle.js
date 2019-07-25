import { useContext } from 'react'
import { ThemeContext } from '../context'

export default function useGraphQL() {
  const { setTheme, styles } = useContext(ThemeContext)

  return {
    setTheme,
    styles
  }
}
