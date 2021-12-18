import { Button, Card, Typography } from 'antd'
import { useState } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { useUser, useUserContext } from 'entities/user/lib'
import { PageTitle } from 'shared/ui'

import { Achievements, ScoreCard, ShareModal } from '..'
import mock from '../../assets/mock.svg'
import styles from './profile.module.scss'
import { PATH } from 'shared/config'

export const Profile = () => {
  const { user: userContext } = useUserContext()
  const { data: user } = useUser(userContext?.id)
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
              src={userContext?.avatarUrl || mock}
            />
            <Typography.Title className={styles.name} level={5}>
              {userContext?.name}
            </Typography.Title>
            <Typography.Text>{userContext?.id}</Typography.Text>
          </Card>
        </div>
        <div className={styles.column}>
          <ScoreCard info='Info' label='ПГАС баллы' value={user?.pgasScore}>
            <Button>Конвертировать</Button>
          </ScoreCard>
          <ScoreCard info='Info' label='Доп баллы' value={user?.personalScore}>
            <Button onClick={() => setIsShareModalVisible(true)}>
              Подарить
            </Button>
            {userContext && (
              <Link
                to={generatePath(PATH.PROFILE_SHOP, {
                  userId: userContext.id,
                })}
              >
                <Button>Потратить</Button>
              </Link>
            )}
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
