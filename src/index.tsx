import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from 'app/ui'
import { AuthProvider } from 'processes/auth/ui'
import { SWRConfig } from 'swr'
import { api } from 'shared/api'
import { AxiosRequestConfig } from 'axios'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

render(
  <SWRConfig
    value={{
      fetcher: (url: string, config?: AxiosRequestConfig) =>
        api.get(url, config).then((response) => response.data),
    }}
  >
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </SWRConfig>,
  document.getElementById(`root`),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
