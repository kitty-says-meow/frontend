import { useUser } from 'entities/user/lib'

import styles from './home.module.scss'

export const Home = () => {
  const { user } = useUser()

  return (
    <div className={styles.wrapper}>
      <p>Привет, {user?.name}</p>
    </div>
  )
}
