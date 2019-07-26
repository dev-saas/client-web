import React, { useState, useEffect } from 'react'

import { ThemeContext } from '../context'
import getStyles, { THEMES } from '../styles/styles'

const ThemeProvider = props => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || THEMES.Light
  )
  const [styles, setStyles] = useState(getStyles(theme))

  useEffect(() => {
    document.body.style.backgroundColor = styles.body.backgroundColor
  }, [styles])

  const setThem = theme => {
    setTheme(theme)
    setStyles(getStyles(theme))
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeContext.Provider value={{ setTheme: setThem, styles, theme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
