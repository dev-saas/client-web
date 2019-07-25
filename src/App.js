import React from 'react'
import { HashRouter } from 'react-router-dom'
import Routes from './Routes'
import {
  AuthProvider,
  NotificationProvider,
  ApolloProvider,
  RollbarProvider,
  LoadProvider,
  GraphQLProvider,
  ThemeProvider
} from './provider'
import { MainNavigation, Notification } from './components'
import GAListener from './GAListener'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n/i18n'

import 'typeface-roboto'

const App = props => (
  <RollbarProvider>
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <GAListener>
          <NotificationProvider>
            <AuthProvider>
              <LoadProvider>
                <ApolloProvider>
                  <GraphQLProvider>
                    <ThemeProvider>
                      <MainNavigation />
                      <Routes />
                      <Notification />
                    </ThemeProvider>
                  </GraphQLProvider>
                </ApolloProvider>
              </LoadProvider>
            </AuthProvider>
          </NotificationProvider>
        </GAListener>
      </HashRouter>
    </I18nextProvider>
  </RollbarProvider>
)

export default App
