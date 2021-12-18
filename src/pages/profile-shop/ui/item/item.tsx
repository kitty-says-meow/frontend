import { useState } from 'react'
import { motion } from 'framer-motion'
import { itemContentType } from '../../ItemsContent'

import styles from './Item.module.scss'

interface Props {
  item: itemContentType
  onChange: (value: boolean) => void
  checked: boolean
}

export const Item = ({ checked, onChange, item }: Props) => {
  const [isHover, setIsHover] = useState(false)

  // Motion effects
  const variants = {
    default: {
      height: '56px',
      background: '#94B6F5',
    },
    hover: {
      height: '62px',
      background: '#3D75DE',
    },
    selected: {
      height: '180px',
      background: '#3D75DE',
    },
  }
  const textVariants = {
    default: { color: '#000000', transition: { duration: 0.1, delay: 0.2 } },
    selected: { color: '#ffffff', transition: { duration: 0.1, delay: 0.05 } },
  }

  return (
    <div
      className={styles.programContainer}
      onClick={() => onChange(!checked)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <motion.div
        animate={checked ? 'selected' : isHover ? 'hover' : 'default'}
        variants={variants}
        transition={{ duration: 0.2 }}
        className={styles.coloredBlock}
      >
        {item.icon}
      </motion.div>
      <div className={styles.infoBlock}>
        <motion.p
          animate={checked ? 'selected' : 'default'}
          variants={textVariants}
          className={styles.name}
        >
          {item.name}
        </motion.p>
        <motion.p
          animate={checked ? 'selected' : 'default'}
          variants={textVariants}
          className={styles.scores}
        >
          {item.scores} баллов
        </motion.p>
      </div>
    </div>
  )
}
