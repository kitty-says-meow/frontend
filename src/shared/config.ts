export enum PATH {
  HOME = `/`,
  EVENTS = `/events`,
  EVENT = `/events/:eventId`,
  PROFILE = `/:userId`,
  PROFILE_SHOP = `/:userId/shop`,
  RATING = `/rating`,
  CLUBS = `/clubs`,
}

export const routingTransitionDuration = 0.3
