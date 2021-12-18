import { PageTitle } from 'shared/ui'
import { Item } from '..'
import { Button, Card, notification, Statistic, Typography } from 'antd'

import styles from './profile-shop.module.scss'
import { itemsContent } from '../../ItemsContent'
import { useState } from 'react'

export const ProfileShop = () => {
  const [items, setItems] = useState<number[]>(itemsContent.map(() => 0))
  const [sum, setSum] = useState(0)
  const myScores = 10

  const handleCheck = (index: number, value: number) => {
    const newItems = [...items]
    newItems[index] = value

    const sum = newItems.reduce((acc, val) => acc + val)

    if (sum <= myScores) {
      setSum(sum)
      setItems(newItems)
      return
    }

    notification.error({ message: `Недостаточно средств` })
  }

  return (
    <>
      <header className={styles.header}>
        <PageTitle title='Потратить баллы' />
        <Typography.Title level={4}>
          Выбери, куда хочешь <br />
          потратить баллы
        </Typography.Title>
        <Card className={styles.card}>
          <Statistic title='Твои баллы' value={myScores} />
        </Card>
        <Card className={styles.card}>
          <Statistic title='Общая стоимость' value={sum} />
        </Card>
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
      <Button className={styles.button} size='large' type='primary'>
        Обменять баллы
      </Button>
    </>
  )
}
