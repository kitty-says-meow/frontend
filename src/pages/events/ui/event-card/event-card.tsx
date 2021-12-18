import { Card, Typography } from 'antd'
import { generatePath, Link } from 'react-router-dom'
import styles from './event-card.module.scss'
import { PATH } from 'shared/config'

export const EventCard = () => {
  return (
    <Link to={generatePath(PATH.EVENT, { eventId: 1 })}>
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
    </Link>
  )
}
