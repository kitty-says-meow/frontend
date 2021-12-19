export enum PATH {
  HOME = `/`,
  EVENTS = `/events`,
  EVENT = `/events/:eventId`,
  PROFILE = `/:userId`,
  PROFILE_SHOP = `/:userId/shop`,
  PROFILE_SHOP_SUCCESS = `/:userId/shop/:code`,
  RATING = `/rating`,
  CLUBS = `/clubs`,
}

export const routingTransitionDuration = 0.3

export const categories = [
  { value: 1, label: `Учебная деятельность` },
  { value: 2, label: `Научно-исследовательская деятельность` },
  { value: 3, label: `Общественная деятельность` },
  { value: 4, label: `Культурно-творческая деятельность` },
  { value: 5, label: `Спортивная деятельность` },
]

export const roles = [
  { value: 'Организатор' },
  { value: 'Ответственный исполнитель' },
  { value: 'Волонтер' },
  { value: 'Куратор студентов' },
]

export const statuses = [
  { value: 1, label: 'На рассмотрении' },
  { value: 2, label: 'Мероприятие одобрено' },
  { value: 3, label: 'Мероприятие отклонено' },
  { value: 4, label: 'Ожидается отправка отчёта' },
  { value: 5, label: 'Ожидается утверждение отчёта' },
  { value: 6, label: 'Отчёт утверждён' },
  { value: 7, label: 'Отчёт отклонён' },
]

export const statusToColor = {
  1: `gold`,
  2: `green`,
  3: `red`,
  4: `gold`,
  5: `gold`,
  6: `green`,
  7: `red`,
}
