import { PageTitle } from 'shared/ui'
import styles from './clubs.module.scss'
import { EventCard } from 'widgets/events/ui'
import { Button, Tag } from 'antd'
import { useState } from 'react'
import { CreateEvent } from '..'
import { useEvents } from 'entities/events/lib'

export const Clubs = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { data: events } = useEvents(``)

  return (
    <>
      <PageTitle title='Мероприятия моих клубов' />
      <Button
        className={styles.button}
        type='primary'
        size='large'
        onClick={() => setIsVisible(true)}
      >
        Создать мероприятие
      </Button>
      <div className={styles.wrapper}>
        {events?.map((event) => (
          <EventCard
            event={event}
            tags={
              <>
                <Tag>akjsdnsajk</Tag>
              </>
            }
          />
        ))}
      </div>
      <CreateEvent visible={isVisible} setVisible={setIsVisible} />
    </>
  )
}
