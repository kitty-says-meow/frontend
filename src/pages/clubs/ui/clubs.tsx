import { PageTitle } from 'shared/ui'
import styles from 'pages/clubs/ui/clubs.module.scss'
import { EventCard } from 'widgets/events/ui'
import { Tag } from 'antd'

export const Clubs = () => {
  return (
    <>
      <PageTitle title='Мероприятия моих клубов' />
      <div className={styles.wrapper}>
        <EventCard
          tags={
            <>
              <Tag>akjsdnsajk</Tag>
            </>
          }
        />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  )
}
