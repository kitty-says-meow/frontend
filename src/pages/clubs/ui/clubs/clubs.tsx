import { PageTitle } from 'shared/ui'
import styles from './clubs.module.scss'
import { EventCard } from 'widgets/events/ui'
import { Button, Tag } from 'antd'
import { useState } from 'react'
import { CreateEvent } from '..'

export const Clubs = () => {
  const [isVisible, setIsVisible] = useState(false)

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
      <CreateEvent visible={isVisible} setVisible={setIsVisible} />
    </>
  )
}
