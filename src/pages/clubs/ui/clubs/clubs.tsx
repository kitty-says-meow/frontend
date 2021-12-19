import { PageTitle } from 'shared/ui'
import styles from './clubs.module.scss'
import { EventCard } from 'widgets/events/ui'
import { Button, Tag } from 'antd'
import { useState } from 'react'
import { CreateEvent } from '..'
import { useClubEvents } from 'entities/events/lib'
import { statuses, statusToColor } from 'shared/config'

export const Clubs = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { data: events } = useClubEvents()

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
              <Tag
                className={styles.tag}
                color={event?.status && statusToColor[event?.status]}
              >
                {
                  statuses.find((status) => status.value === event?.status)
                    ?.label
                }
              </Tag>
            }
          />
        ))}
      </div>
      <CreateEvent visible={isVisible} setVisible={setIsVisible} />
    </>
  )
}
