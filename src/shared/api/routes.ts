// type Id = string | number

export const routes = {
  auth: `${process.env.REACT_APP_AUTH_ENDPOINT}?${process.env.REACT_APP_AUTH_ENDPOINT}`,
  authToken: process.env.REACT_APP_AUTH_TOKEN_ENDPOINT || ``,
}
