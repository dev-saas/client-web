import React from 'react'
import { SnackbarProvider } from 'notistack'
import { Router } from '../routes/router'
import { useThemeStore } from '../store'
import { NavBar } from './NavBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, Container } from '@material-ui/core'

export function Layout () {
  const { theme } = useThemeStore()
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <NavBar />
        <Container maxWidth="md" style={{ marginTop: 100 }}>
          <Router />
        </Container>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}
