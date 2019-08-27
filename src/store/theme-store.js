import { getTheme } from '../themes/styles'
import { useGlobalState } from '../reducer'

export const theme = getTheme(localStorage.getItem('theme') || 'Dark')

const types = {
  SET_THEME: 'SET_THEME'
}

export function themeReducer (theme, action) {
  switch (action.type) {
    case types.SET_THEME:
      return getTheme(action.payload)

    default:
      return theme
  }
}

export function useThemeStore () {
  const [{ theme }, dispatch] = useGlobalState()

  function setTheme (theme) {
    dispatch({
      type: types.SET_THEME,
      payload: theme
    })
  }

  return { setTheme, theme }
}
