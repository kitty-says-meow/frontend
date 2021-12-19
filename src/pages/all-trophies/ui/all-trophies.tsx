import { PageTitle } from 'shared/ui'
import { Divider, Typography } from 'antd'
import classNames from 'classnames'

import styles from './all-trophies.module.scss'

import { ReactComponent as HareSVG } from '../hare.svg'
import { Fragment } from 'react'

const data = [
  {
    id: 'Особые',
    trophies: [
      {
        icon: <HareSVG />,
        description: 'Топ 3 в рейтинге',
        scales: 25,
        access: true,
      },
    ],
  },
  {
    id: 'Спортивная деятельность',
    trophies: [
      {
        icon: <HareSVG />,
        description: '5 достижений в Спортивной деятельности',
        scales: 5,
        access: true,
      },
      {
        icon: <HareSVG />,
        description: '10 достижений в Спортивной деятельности',
        scales: 10,
        access: false,
      },
    ],
  },
  {
    id: 'Научная деятельность',
    trophies: [
      {
        icon: <HareSVG />,
        description: '5 достижений в научной деятельности',
        scales: 5,
        access: false,
      },
    ],
  },
]
export const AllTrophies = () => {
  return (
    <>
      <PageTitle title='Достижения' />
      {data.map((category) => (
        <Fragment key={category.id}>
          <Divider className={styles.hr} />
          <Typography.Title level={4} className={styles.categoryName}>
            {category.id}
          </Typography.Title>
          <div className={styles.categoryItem}>
            {category.trophies.map((item, index) => (
              <div
                key={index}
                className={classNames(styles.item, {
                  [styles.disabled]: !item.access,
                })}
              >
                <div className={styles.icon}>
                  <Typography.Title level={1} className={styles.scales}>
                    {`${item.scales}`}
                  </Typography.Title>
                  {item.icon}
                </div>
                <Typography.Text className={styles.description}>
                  {item.description}
                </Typography.Text>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  )
}
