import { Card, Typography } from 'antd'
import { generatePath, Link } from 'react-router-dom'
import styles from './event-card.module.scss'
import { PATH } from 'shared/config'
import { ReactNode } from 'react'
import { declOfNum } from 'shared/lib'

interface Props {
  tags?: ReactNode
  event: Components.Schemas.Event
}

const scoresRange = (
  achievements: Components.Schemas.Event['achievements'],
) => {
  if (!achievements.length) {
    return `Баллы за мероприятие не начисляются`
  }

  let min = Infinity
  let max = -Infinity

  achievements.forEach((achievement) => {
    min = Math.min(min, achievement.score)
    max = Math.max(max, achievement.score)
  })

  return `Можно получить ${
    max > min
      ? `${min}-${max} баллов`
      : `${max} ${declOfNum(max, [`балл`, `балла`, `баллов`])}`
  }`
}

export const EventCard = ({ tags, event }: Props) => {
  return (
    <Link to={generatePath(PATH.EVENT, { eventId: event.id })}>
      <Card
        className={styles.card}
        cover={
          <img
            alt='example'
            className={styles.image}
            src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
          />
        }
      >
        <Typography.Title level={5}>{event.name}</Typography.Title>
        <Typography.Paragraph className={styles.description}>
          {event.description}
        </Typography.Paragraph>
        <Typography.Text disabled className={styles.scores}>
          {scoresRange(event.achievements)}
        </Typography.Text>
        {tags && <div className={styles.tags}>{tags}</div>}
      </Card>
    </Link>
  )
}
