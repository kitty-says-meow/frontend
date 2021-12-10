import { getTokens, redirectToAuthEndpoint, refreshTokens } from 'shared/api'

export const checkAuth = async (): Promise<void> => {
  const refresh = localStorage.getItem(`refresh`)
  const code = new URLSearchParams(window.location.search).get(`code`)

  if (!refresh) {
    if (!code) {
      redirectToAuthEndpoint()
      return
    }

    await getTokens(code)
    return
  }

  try {
    await refreshTokens(refresh)
  } catch {
    localStorage.clear()
    return checkAuth()
  }
}
