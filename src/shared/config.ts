export enum PATH {
  HOME = `/`,
  EVENTS = `/events`,
  EVENT = `/events/:eventId`,
  PROFILE = `/:userId`,
  PROFILE_SHOP = `/:userId/shop`,
  PROFILE_SHOP_SUCCESS = `/:userId/shop/:code`,
  RATING = `/rating`,
  CLUBS = `/clubs`,
  TROPHIES = `/trophies`,
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
