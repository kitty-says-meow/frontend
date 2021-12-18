import styles from './trophies.module.scss'
import { Tooltip } from 'antd'

export const Trophies = () => {
  return (
    <div className={styles.wrapper}>
      <Tooltip title='askjdnaskd'>
        <img
          alt=''
          className={styles.trophy}
          src='https://joeschmoe.io/api/v1/random'
        />
      </Tooltip>
    </div>
  )
}
