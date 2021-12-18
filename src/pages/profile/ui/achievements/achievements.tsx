import { Avatar, List, Typography } from 'antd'

import styles from './achievements.module.scss'

const AchievementCategory = () => {
  return (
    <>
      <Typography.Paragraph className={styles.title}>
        Учебные
        <span className={styles.totalScore}>12312</span>
      </Typography.Paragraph>
      <List
        className={styles.list}
        dataSource={[
          {
            title: `Title`,
            description: `Description`,
            score: 123,
            image: `https://joeschmoe.io/api/v1/random`,
          },
          {
            title: `Title`,
            description: `Description`,
            score: 123,
            image: `https://joeschmoe.io/api/v1/random`,
          },
        ]}
        itemLayout='horizontal'
        renderItem={(item) => (
          <List.Item actions={[item.score]} className={styles.item}>
            <List.Item.Meta
              avatar={
                <Avatar
                  className={styles.avatar}
                  src='https://joeschmoe.io/api/v1/random'
                />
              }
              description='Ant Design, a design language for '
              title={item.title}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export const Achievements = () => {
  return (
    <div className={styles.wrapper}>
      <AchievementCategory />
      <AchievementCategory />
    </div>
  )
}
