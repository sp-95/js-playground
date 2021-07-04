import { store } from '@/app/store'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
