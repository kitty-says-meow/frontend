import { Button, Card, Typography } from 'antd'
import { useState } from 'react'
import { generatePath, Link, useParams } from 'react-router-dom'

import { useUser, useUserContext } from 'entities/users/lib'
import { PageTitle } from 'shared/ui'

import { Achievements, ConvertModal, ScoreCard, ShareModal, Trophies } from '..'
import mock from '../../assets/mock.svg'
import styles from './profile.module.scss'
import { PATH } from 'shared/config'

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user: userContext } = useUserContext()
  const { data: user } = useUser(userId)
  const [isShareModalVisible, setIsShareModalVisible] = useState(false)
  const [isConvertModalVisible, setIsConvertModalVisible] = useState(false)

  const pgasDescription = 'Ваши конкурсные баллы в конкурсе ПГАС'
  const metaDescription =
    '1 коин = 1 ПГАС балл. Коины можно потратить на аренду оборудования, мерч в ITMO.Store, бонусы от партнеров, или подарить своим друзьям '
  return (
    <>
      <PageTitle title={`${user?.firstName} ${user?.lastName}`} />
      <div className={styles.wrapper}>
        <div>
          <Card>
            <img
              alt=''
              className={styles.image}
              src={userContext?.avatarUrl || mock}
            />
            <Typography.Title className={styles.name} level={5}>
              {user?.firstName} {user?.lastName}
            </Typography.Title>
            <Typography.Text>{user?.username}</Typography.Text>
          </Card>
          <Trophies />
        </div>
        <div className={styles.column}>
          <ScoreCard
            info={pgasDescription}
            label='Баллы ПГАС'
            value={user?.pgasScore}
          >
            {userContext?.id === user?.username && (
              <Button onClick={() => setIsConvertModalVisible(true)}>
                Конвертировать
              </Button>
            )}
          </ScoreCard>
          <ScoreCard
            info={metaDescription}
            label='Мета коины'
            value={user?.personalScore}
          >
            {userContext?.id === user?.username && (
              <>
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
              </>
            )}
          </ScoreCard>
          <Achievements />
        </div>
      </div>
      <ShareModal
        isVisible={isShareModalVisible}
        setVisible={setIsShareModalVisible}
      />
      <ConvertModal
        isVisible={isConvertModalVisible}
        setVisible={setIsConvertModalVisible}
      />
    </>
  )
}
