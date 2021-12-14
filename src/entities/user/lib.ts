import { useContext } from 'react'

import { UserContext } from './ui'

export const useUser = () => useContext(UserContext)
