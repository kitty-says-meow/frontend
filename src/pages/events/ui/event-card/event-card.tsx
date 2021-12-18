import { Card, Typography } from 'antd'
import styles from './event-card.module.scss'

export const EventCard = () => {
  return (
    <Card
      cover={
        <img
          alt='example'
          className={styles.image}
          src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
        />
      }
    >
      <Typography.Title level={5}>Хакатон от ICT</Typography.Title>
      <Typography.Paragraph>
        Научно-исследовательская работа
      </Typography.Paragraph>
      <Typography.Text disabled>Можно получить 5 баллов</Typography.Text>
    </Card>
  )
}
