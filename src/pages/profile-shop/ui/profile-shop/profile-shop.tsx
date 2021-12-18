import { PageTitle } from 'shared/ui'
import { Item } from '..'
import { Button, Card, Statistic, Typography } from 'antd'

import styles from './profile-shop.module.scss'

export const ProfileShop = () => {
  return (
    <>
      <header className={styles.header}>
        <PageTitle title='Потратить баллы' />
        <Typography.Title level={4}>
          Выбери, куда хочешь <br />
          потратить баллы
        </Typography.Title>
        <Card className={styles.card}>
          <Statistic title='Твои баллы' value={10} />
        </Card>
        <Card className={styles.card}>
          <Statistic title='Общая стоимость' value={10} />
        </Card>
      </header>
      <div className={styles.wrapper}>
        <Item />
        <Item />
        <Item />
      </div>
      <Button className={styles.button} size='large' type='primary'>
        Обменять баллы
      </Button>
    </>
  )
}
