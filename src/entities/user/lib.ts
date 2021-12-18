import { useContext } from 'react'
import useSWR from 'swr'

import { UserContext } from './ui'

export const useUser = () => useContext(UserContext)

export const useUsersSearch = (search?: string) =>
  useSWR<Components.Schemas.User[]>(
    search && search.length >= 3
      ? [`/users/search`, { params: { user: search } }]
      : null,
  )
