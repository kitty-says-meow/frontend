import { PageTitle } from 'shared/ui'
import { EventCard } from '..'
import styles from './events.module.scss'

export const Events = () => {
  return (
    <>
      <PageTitle title='Мероприятия' />
      <div className={styles.wrapper}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  )
}
