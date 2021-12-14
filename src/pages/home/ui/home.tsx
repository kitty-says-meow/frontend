import { useUser } from 'entities/user/lib'
import { Logo } from 'shared/assets'

import styles from './home.module.scss'

export const Home = () => {
  const { user } = useUser()

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <p>Привет, {user?.name}</p>
    </div>
  )
}
