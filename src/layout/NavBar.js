import React from 'react'
import { AppBar, Toolbar, Slide, useScrollTrigger } from '@material-ui/core'
import { LanguageDropdown, MenuDrawer, ThemeButton, SearchBar } from './components'

export function NavBar () {
  const trigger = useScrollTrigger()

  return (
    <Slide direction="down" appear={false} in={!trigger}>
      <AppBar>
        <Toolbar style={{ display: 'flex' }}>
          <MenuDrawer />
          <ThemeButton />
          <LanguageDropdown />
          <div style={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
            <SearchBar />
          </div>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
