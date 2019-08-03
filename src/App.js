import React from 'react'
import { HashRouter } from 'react-router-dom'
import Routes from './Routes'
import { NotificationProvider, ThemeProvider } from './provider'
import { MainNavigation, Notification } from './components'
import GAListener from './GAListener'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'
import 'typeface-roboto'
import { StateProvider } from './reducer'
import { ApolloProvider } from 'react-apollo'
import client from './Apollo'

const App = props => (
  <I18nextProvider i18n={i18n}>
    <ApolloProvider client={client}>
      <HashRouter>
        <GAListener>
          <StateProvider>
            <NotificationProvider>
              <ThemeProvider>
                <MainNavigation />
                <Routes />
                <Notification />
              </ThemeProvider>
            </NotificationProvider>
          </StateProvider>
        </GAListener>
      </HashRouter>
    </ApolloProvider>
  </I18nextProvider>
)

export default App
