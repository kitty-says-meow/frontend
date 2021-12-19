import { useContext } from 'react'
import useSWR from 'swr'

import { UserContext } from './ui'
import { api } from 'shared/api'

export const useUserContext = () => useContext(UserContext)

export const useUsersSearch = (search?: string) =>
  useSWR<Components.Schemas.User[]>(
    search && search.length >= 3
      ? [`/users/search`, { params: { user: search } }]
      : null,
  )

export const useUser = (username?: string) =>
  useSWR<Components.Schemas.User>(username ? `/users/${username}` : null)

export const useUserProfile = () =>
  useSWR<Components.Schemas.Profile>(`/users/profile`)

export const sendUserScore = (username: string, score: number) =>
  api.post(`/users/${username}/score/send`, { score })

export const convertUserScore = (score: number) =>
  api.post(`/users/score/convert`, { score })

export const useRating = () =>
  useSWR<Components.Schemas.Rating[]>(`/users/rating`)

export const useRatingData = () =>
  useSWR<Components.Schemas.AchievementRating[]>(`/users/rating-data`)
