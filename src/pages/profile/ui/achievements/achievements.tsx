import { Avatar, List, Typography } from 'antd'

import styles from './achievements.module.scss'

const AchievementCategory = () => {
  return (
    <>
      <Typography.Text>Учебные</Typography.Text>
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
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              description='Ant Design, a design language for background applications, is refined by Ant UED Team'
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
