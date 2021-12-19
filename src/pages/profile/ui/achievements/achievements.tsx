import { Avatar, List, Typography } from 'antd'

import styles from './achievements.module.scss'
import { useUser } from 'entities/users/lib'
import { generatePath, Link, useParams } from 'react-router-dom'
import { categories, PATH } from 'shared/config'
import { useMemo } from 'react'

interface Props {
  title: string
  sum: number
  achievements?: Components.Schemas.UserAchievement[]
}

const AchievementCategory = ({ title, achievements, sum }: Props) => {
  return (
    <>
      <Typography.Paragraph className={styles.title}>
        {title}
        <span className={styles.totalScore}>{sum}</span>
      </Typography.Paragraph>
      <List
        className={styles.list}
        dataSource={achievements}
        itemLayout='horizontal'
        renderItem={(achievement) => (
          <Link
            to={generatePath(PATH.EVENT, { eventId: achievement.event.id })}
          >
            <List.Item actions={[achievement.score]} className={styles.item}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className={styles.avatar}
                    src='https://joeschmoe.io/api/v1/random'
                  />
                }
                description={achievement.event.name}
                title={achievement.name}
              />
            </List.Item>
          </Link>
        )}
      />
    </>
  )
}

type Obj = Record<
  Components.Schemas.UserAchievement['event']['category'],
  { sum: number; achievements: Components.Schemas.UserAchievement[] }
>

export const Achievements = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useUser(userId)

  const achievementByType = useMemo(() => {
    const obj: Obj = {} as Obj
    user?.achievements.forEach((achievement) => {
      if (!obj[achievement.event.category]) {
        obj[achievement.event.category] = { sum: 0, achievements: [] }
      }
      obj[achievement.event.category].sum += achievement.score
      obj[achievement.event.category].achievements.push(achievement)
    })

    return obj
  }, [user?.achievements])

  return (
    <div className={styles.wrapper}>
      {Object.entries(achievementByType).map(([category, data]) => (
        <AchievementCategory
          key={category}
          title={
            categories.find(
              (extCategory) => extCategory.value === parseInt(category),
            )?.label || ``
          }
          sum={data.sum}
          achievements={data.achievements}
        />
      ))}
    </div>
  )
}
