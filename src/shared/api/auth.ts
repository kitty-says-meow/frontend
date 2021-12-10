import { api } from 'shared/api/api'

const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT as string
const tokenEndpoint = process.env.REACT_APP_AUTH_TOKEN_ENDPOINT as string
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID as string
const clientSecret = process.env.REACT_APP_AUTH_CLIENT_SECRET as string

interface Params {
  access_token: string
  refresh_token: string
}

export const updateTokens = ({ access_token, refresh_token }: Params) => {
  localStorage.setItem(`access`, access_token)
  localStorage.setItem(`refresh`, refresh_token)
  api.defaults.headers.common.Authorization = `Bearer ${access_token}`
}

export const getTokens = async (code: string) => {
  const redirectUri = `${window.location.origin}${window.location.pathname}`

  const { data } = await api.post(
    tokenEndpoint,
    new URLSearchParams({
      grant_type: `authorization_code`,
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  )

  updateTokens(data)

  window.location.replace(redirectUri)
}

export const redirectToAuthEndpoint = () => {
  const url = new URL(authEndpoint)

  url.searchParams.append(`client_id`, clientId)
  url.searchParams.append(`redirect_uri`, window.location.href)
  url.searchParams.append(`response_type`, `code`)

  window.location.replace(url.href)
}

export const refreshTokens = async (refreshToken: string) => {
  const { data } = await api.post<Params>(
    tokenEndpoint,
    new URLSearchParams({
      grant_type: `refresh_token`,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      redirect_uri: `${window.location.origin}${window.location.pathname}`,
    }),
  )

  updateTokens(data)

  return data
}
