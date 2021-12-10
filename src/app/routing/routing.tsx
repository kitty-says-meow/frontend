import { AnimatePresence, motion } from 'framer-motion'
import { ComponentType } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { routingTransitionDuration } from 'shared/config'

export type Paths = {
  path?: string
  component: ComponentType
  default?: boolean
}[]

interface Props {
  paths: Paths
}

export const Routing = ({ paths }: Props) => {
  const location = useLocation()

  const defaultPath = paths.find((route) => route.default)?.path

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch key={location.pathname} location={location}>
        <Redirect
          from='/:url*(/+)'
          to={window.location.pathname.slice(0, -1)}
        />
        {paths.map((route) => (
          <Route key={route.path} exact path={route.path}>
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: routingTransitionDuration / 2 }}
            >
              <route.component />
            </motion.div>
          </Route>
        ))}
        {defaultPath && <Redirect to={defaultPath} />}
      </Switch>
    </AnimatePresence>
  )
}
