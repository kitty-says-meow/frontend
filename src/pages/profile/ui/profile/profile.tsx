import { Button, Card, Typography } from 'antd'
import { useState } from 'react'

import { useUser } from 'entities/user/lib'
import { PageTitle } from 'shared/ui'

import { Achievements, ScoreCard, ShareModal } from '..'
import mock from '../../assets/mock.svg'
import styles from './profile.module.scss'

export const Profile = () => {
  const { user } = useUser()
  const [isShareModalVisible, setIsShareModalVisible] = useState(false)

  return (
    <>
      <PageTitle title='Мой профиль' />
      <div className={styles.wrapper}>
        <div>
          <Card>
            <img
              alt=''
              className={styles.image}
              src={user?.avatarUrl || mock}
            />
            <Typography.Title className={styles.name} level={5}>
              {user?.name}
            </Typography.Title>
            <Typography.Text>{user?.id}</Typography.Text>
          </Card>
        </div>
        <div className={styles.column}>
          <ScoreCard info='Info' label='ПГАС баллы' value={125}>
            <Button>Конвертировать</Button>
          </ScoreCard>
          <ScoreCard info='Info' label='ПГАС баллы' value={125}>
            <Button onClick={() => setIsShareModalVisible(true)}>
              Подарить
            </Button>
            <Button>Потратить</Button>
          </ScoreCard>
          <Achievements />
        </div>
      </div>
      <ShareModal
        isVisible={isShareModalVisible}
        setVisible={setIsShareModalVisible}
      />
    </>
  )
}
