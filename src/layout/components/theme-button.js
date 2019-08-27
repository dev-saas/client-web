import React from 'react'
import { useThemeStore } from '../../store'
import { IconButton } from '@material-ui/core'
import { InvertColors, InvertColorsOff } from '@material-ui/icons'
import { THEMES } from '../../themes/styles'

export function ThemeButton () {
  const { setTheme } = useThemeStore()

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
