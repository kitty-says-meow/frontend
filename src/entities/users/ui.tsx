import { createContext } from 'react'

import { User } from 'shared/api'

interface UserContextInterface {
  user?: User
}

export const UserContext = createContext<UserContextInterface>({})
