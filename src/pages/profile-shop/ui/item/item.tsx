import { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'
import { itemContentType } from '../../ItemsContent'

import styles from './Item.module.scss'

export const Item = (props: {
  itemContent: itemContentType
  setSum: Dispatch<SetStateAction<number>>
  sum: number
  myScores: number
}) => {
  const [isHover, setIsHover] = useState(false)
  const [selected, setSeleted] = useState(false)

  const onCardClick = () => {
    if (selected) {
      props.setSum((value) => value - props.itemContent.scores)
      setSeleted((value) => !value)
    } else if (props.myScores >= props.itemContent.scores + props.sum) {
      props.setSum((value) => value + props.itemContent.scores)
      setSeleted((value) => !value)
    }
  }

  // Motion effects
  const variants = {
    default: {
      borderRadius: '4px 4px 0px 0px',
      height: '56px',
      transition: { duration: 0.5 },
      background: '#94B6F5',
    },
    hover: {
      height: '62px',
      borderRadius: '4px 4px 0px 0px',
      transition: {
        duration: 0.5,
      },
      background: '#3D75DE',
    },
    selected: {
      height: '100%',
      borderRadius: '4px 4px 4px 4px',
      transition: { duration: 0.5 },
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
      onClick={() => onCardClick()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <motion.div
        animate={selected ? 'selected' : isHover ? 'hover' : 'default'}
        variants={variants}
        transition={{ ease: 'easeOut', duration: 0.5 }}
        className={styles.coloredBlock}
      >
        {props.itemContent.icon}
      </motion.div>
      <div className={styles.infoBlock}>
        <motion.p
          animate={selected ? 'selected' : 'default'}
          variants={textVariants}
          className={styles.name}
        >
          {props.itemContent.name}
        </motion.p>
        <motion.p
          animate={selected ? 'selected' : 'default'}
          variants={textVariants}
          className={styles.scores}
        >
          {`${props.itemContent.scores} баллов`}
        </motion.p>
      </div>
    </div>
  )
}
