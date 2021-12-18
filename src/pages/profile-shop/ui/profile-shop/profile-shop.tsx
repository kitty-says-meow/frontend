import { PageTitle } from 'shared/ui'
import { Item } from '..'
import { Button, Card, Statistic, Typography } from 'antd'

import styles from './profile-shop.module.scss'
import { itemsContent } from '../../ItemsContent'
import { useState } from 'react'

export const ProfileShop = () => {
  const [sum, setSum] = useState(0)
  const myScores = 10

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
        {itemsContent.map((item) => (
          <Item
            itemContent={item}
            setSum={setSum}
            sum={sum}
            myScores={myScores}
          />
        ))}
      </div>
      <Button className={styles.button} size='large' type='primary'>
        Обменять баллы
      </Button>
    </>
  )
}
