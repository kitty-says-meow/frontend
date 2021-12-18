import { api } from 'shared/api'
import useSWR from 'swr'

export const useEvents = (category: string) =>
  useSWR<Components.Schemas.Event[]>([
    `/events`,
    {
      params: {
        category,
      },
    },
  ])

export const useEvent = (id: number | string) =>
  useSWR<Components.Schemas.Event>(`/events/${id}`)

export const createEvent = (values: Paths.EventsCreate.RequestBody) =>
  api.post<Components.Schemas.Event>(`/events`, values)
