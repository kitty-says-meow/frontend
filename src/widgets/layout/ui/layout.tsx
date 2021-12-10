import { motion } from 'framer-motion'
import { ReactNode } from 'react'

import { routingTransitionDuration } from 'shared/config'

import styles from './layout.module.scss'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <motion.header
        animate={{ opacity: 1 }}
        className={styles.header}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: routingTransitionDuration }}
      >
        {children}
      </motion.header>
    </div>
  )
}
