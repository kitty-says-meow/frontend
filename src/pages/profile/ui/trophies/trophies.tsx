import styles from './trophies.module.scss'
import { Tooltip } from 'antd'
import { useUser } from 'entities/users/lib'
import { useParams } from 'react-router-dom'

export const Trophies = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useUser(userId)

  return (
    <div className={styles.wrapper}>
      {user?.trophies
        .filter((trophy) => trophy.hasTrophy)
        .map((trophy) => (
          <Tooltip key={trophy.code} title={trophy.description}>
            <img alt='' className={styles.trophy} src={trophy.icon} />
          </Tooltip>
        ))}
    </div>
  )
}
