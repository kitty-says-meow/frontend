import { PageTitle } from 'shared/ui'
import { Item } from '..'
import { Button, Card, notification, Statistic, Typography } from 'antd'

import styles from './profile-shop.module.scss'

import { itemsContent } from '../../ItemsContent'
import { useMemo, useState } from 'react'
import { sendUserScore, useUserProfile } from 'entities/users/lib'
import { mutate } from 'swr'
import { generatePath, useHistory } from 'react-router-dom'
import { PATH } from 'shared/config'
import { useIsDesktop } from 'shared/lib'

export const ProfileShop = () => {
  const [items, setItems] = useState<number[]>(itemsContent.map(() => 0))
  const [sum, setSum] = useState(0)
  const { data: profile } = useUserProfile()
  const [isLoading, setIsloading] = useState(false)
  const history = useHistory()
  const { isDesktop } = useIsDesktop()

  const score = useMemo(
    () => profile?.personalScore || 0,
    [profile?.personalScore],
  )

  const handleCheck = (index: number, value: number) => {
    const newItems = [...items]
    newItems[index] = value

    const sum = newItems.reduce((acc, val) => acc + val)

    if (sum <= score) {
      setSum(sum)
      setItems(newItems)
      return
    }

    notification.error({ message: `Недостаточно средств` })
  }

  const handlePurchase = async () => {
    if (!profile) {
      return
    }
    setIsloading(true)
    await sendUserScore(`admin`, sum)
    notification.success({ message: `Покупка совершена` })
    await mutate(`/users/${profile.username}`, {
      ...profile,
      personalScore: profile.personalScore - sum,
    })
    history.push(
      generatePath(PATH.PROFILE_SHOP_SUCCESS, {
        userId: profile.username,
        code: Math.floor(100000 + Math.random() * 900000),
      }),
    )
  }

  return (
    <>
      <header className={styles.header}>
        <PageTitle title='Потратить баллы' />
        {isDesktop && (
          <>
            <Typography.Title level={4} className={styles.title}>
              Выбери, куда хочешь <br />
              потратить баллы
            </Typography.Title>
            <Card className={styles.card}>
              <Statistic title='Твои баллы' value={score} />
            </Card>
            <Card className={styles.card}>
              <Statistic title='Общая стоимость' value={sum} />
            </Card>
          </>
        )}
        {!isDesktop && (
          <div className={styles.mobileCards}>
            <Card className={styles.card}>
              <Statistic title='Твои баллы' value={score} />
            </Card>
            <Card className={styles.card}>
              <Statistic title='Общая стоимость' value={sum} />
            </Card>
          </div>
        )}
      </header>
      <div className={styles.wrapper}>
        {itemsContent.map((item, index) => (
          <Item
            item={item}
            checked={!!items[index]}
            onChange={(checked) =>
              handleCheck(index, checked ? item.scores : 0)
            }
          />
        ))}
      </div>
      <Button
        className={styles.button}
        disabled={!items.find(Boolean)}
        loading={isLoading}
        size='large'
        type='primary'
        onClick={handlePurchase}
      >
        Обменять баллы
      </Button>
    </>
  )
}
