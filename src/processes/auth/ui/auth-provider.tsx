import { ReactNode, useEffect, useMemo, useState } from 'react'

import { UserContext } from 'entities/users/ui'
import { getUser, User } from 'shared/api'

import { checkAuth } from '../lib'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    checkAuth()
      .then(() => setIsLoading(false))
      .then(() => setUser(getUser()))
  }, [])

  const value = useMemo(() => ({ user }), [user])

  if (isLoading) {
    return null
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
