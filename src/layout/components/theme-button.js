import React from 'react'
import { useThemeCreator } from '../../actions/store/theme-store'
import { IconButton } from '@material-ui/core'
import { InvertColors, InvertColorsOff } from '@material-ui/icons'
import { THEMES } from '../../themes/styles'
export default function themeButton () {
  const { setTheme } = useThemeCreator()

  function ThemeButton ({ theme }) {
    return (
      theme !== localStorage.getItem('theme') && (
        <IconButton onClick={() => setTheme(theme)}>
          {theme === THEMES.Light ? (
            <InvertColorsOff />
          ) : (
            <InvertColors />
          )}
        </IconButton>
      )
    )
  }

  return (
    <>
      <ThemeButton theme={THEMES.Light} />
      <ThemeButton theme={THEMES.Dark} />
    </>
  )
}
