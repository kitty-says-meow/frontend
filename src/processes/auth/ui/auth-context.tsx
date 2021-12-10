import { createContext } from 'react'

interface AuthContextInterface {
  setIsAuthorized: (authorized: boolean) => void
  isAuthorized: boolean
}

export const AuthContext = createContext<AuthContextInterface>({
  setIsAuthorized: () => void null,
  isAuthorized: false,
})
