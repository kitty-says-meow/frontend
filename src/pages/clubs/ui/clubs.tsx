import { PageTitle } from 'shared/ui'
import styles from './styles.module.scss'
import { EventCard } from 'widgets/events/ui'

export const Clubs = () => {
  return (
    <>
      <PageTitle title='Мероприятия моих клубов' />
      <div className={styles.wrapper}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  )
}
