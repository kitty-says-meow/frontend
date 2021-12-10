import { ReactNode, useEffect, useMemo, useState } from 'react'

import { checkAuth } from '../lib'
import { AuthContext } from './auth-context'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    checkAuth().then(() => setIsLoading(false))
  }, [])

  const contextValue = useMemo(
    () => ({ isAuthorized, setIsAuthorized }),
    [isAuthorized],
  )

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
