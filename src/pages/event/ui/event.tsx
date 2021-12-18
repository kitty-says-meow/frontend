import { PageTitle } from 'shared/ui'
import { Card, Divider, Typography } from 'antd'

import styles from './event.module.scss'

export const Event = () => {
  return (
    <>
      <PageTitle title='Название мероприятия' />
      <div className={styles.wrapper}>
        <div>
          <Card>
            <img
              alt=''
              className={styles.image}
              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            />
            <Typography.Title className={styles.name} level={5}>
              5 баллов
            </Typography.Title>
            <Typography.Text>Перове место в хакатоне</Typography.Text>
            <Typography.Title className={styles.name} level={5}>
              5 баллов
            </Typography.Title>
            <Typography.Text>Перове место в хакатоне</Typography.Text>
            <Typography.Title className={styles.name} level={5}>
              5 баллов
            </Typography.Title>
            <Typography.Text>Перове место в хакатоне</Typography.Text>
          </Card>
        </div>
        <div className={styles.right}>
          <Typography.Title level={3}>Хакатон от ICT#3</Typography.Title>
          <Typography.Paragraph className={styles.description}>
            На нашем хакатоне вы получите что нибудь прикольное. Здесь можно и
            покушать и не покушать. Все что у годно!
          </Typography.Paragraph>
          <div className={styles.dates}>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Дата начала
              </Typography.Title>
              <Typography.Text>24 мая 2022 18:00</Typography.Text>
            </div>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Дата начала
              </Typography.Title>
              <Typography.Text>24 мая 2022 18:00</Typography.Text>
            </div>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Дата начала
              </Typography.Title>
              <Typography.Text>Научно-исследовательская</Typography.Text>
            </div>
          </div>
          <Divider className={styles.hr} />
        </div>
      </div>
    </>
  )
}
