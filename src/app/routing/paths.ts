import * as pages from 'pages'
import { PATH } from 'shared/config'

import { Paths } from './routing'

export const paths: Paths = [
  { path: PATH.HOME, component: pages.Home, default: true },
  { path: PATH.EVENTS, component: pages.Events },
  { path: PATH.RATING, component: pages.Rating },
  { path: PATH.PROFILE, component: pages.Profile },
]
