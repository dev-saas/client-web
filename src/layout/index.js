import React from 'react'
import { SnackbarProvider } from 'notistack'
import Router from '../routes/router'
import { useThemeCreator } from '../actions/store/theme-store'
import NavBar from './NavBar'
import Content from './Content'
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export default function Layout () {
  const { theme } = useThemeCreator()
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <NavBar />
        <Content>
          <Router />
        </Content>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}
