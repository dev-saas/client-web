import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { ApolloProvider } from 'react-apollo'
import 'typeface-roboto'
import i18n from './i18n'
import { StateProvider } from './reducer'
import client from './apollo-client'
import Layout from './layout'
export default function App () {
  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <StateProvider>
          <Layout />
        </StateProvider>
      </ApolloProvider>
    </I18nextProvider>
  )
}
