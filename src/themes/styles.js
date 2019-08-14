import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, blueGrey } from '@material-ui/core/colors'

export const THEMES = {
  Dark: 'dark',
  Light: 'light'
}

const darkPalette = {
  type: 'dark',
  primary: blueGrey
}

const lightPalette = {
  type: 'light',
  primary: lightBlue
}

export function getTheme (theme) {
  switch (theme) {
    case THEMES.Dark:
      localStorage.setItem('theme', theme)
      return createMuiTheme({ palette: darkPalette })
    case THEMES.Light:
      localStorage.setItem('theme', theme)
      return createMuiTheme({ palette: lightPalette })
    default:
      localStorage.setItem('theme', THEMES.Light)
      return createMuiTheme({ palette: lightPalette })
  }
}
