import { Logo } from 'shared/assets'

import styles from './home.module.scss'

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <p>Welcome, username</p>
    </div>
  )
}
