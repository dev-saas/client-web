import React from 'react'
import {
  AppBar,
  Toolbar,
  Slide,
  useScrollTrigger
} from '@material-ui/core'
import { LanguageDropdown, MenuDrawer, ThemeButton } from './components'

export default function NavBar () {
  const trigger = useScrollTrigger()

  return (
    <Slide direction="down" appear={false} in={!trigger}>
      <AppBar>
        <Toolbar>
          <MenuDrawer />
          <ThemeButton />
          <LanguageDropdown />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
