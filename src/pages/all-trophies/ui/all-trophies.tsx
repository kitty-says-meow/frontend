import { PageTitle } from 'shared/ui'
import { Divider, Typography } from 'antd'
import classNames from 'classnames'

import styles from './all-trophies.module.scss'

import { Fragment, useMemo } from 'react'
import { useUserProfile } from 'entities/users/lib'
import { categories } from 'shared/config'

type Obj = Record<
  Exclude<
    Components.Schemas.Trophy['category'] | `Особые достижения`,
    undefined | null
  >,
  { sum: number; trophies: Components.Schemas.Trophy[] }
>

export const AllTrophies = () => {
  const { data: profile } = useUserProfile()

  const trophyByType = useMemo(() => {
    const obj: Obj = {} as Obj
    profile?.trophies.forEach((trophy) => {
      const category = trophy.category || `Особые достижения`
      if (!obj[category]) {
        obj[category] = { sum: 0, trophies: [] }
      }
      obj[category].trophies.push(trophy)
    })

    return obj
  }, [profile?.trophies])

  return (
    <>
      <PageTitle title='Достижения' />
      {Object.entries(trophyByType).map(([category, obj]) => (
        <Fragment key={category}>
          <Divider className={styles.hr} />
          <Typography.Title level={4} className={styles.categoryName}>
            {categories.find((cat) => cat.value === parseInt(category))
              ?.label || `Особые достижения`}
          </Typography.Title>
          <div className={styles.categoryItem}>
            {obj.trophies.map((item, index) => (
              <div
                key={index}
                className={classNames(styles.item, {
                  [styles.disabled]: !item.hasTrophy,
                })}
              >
                <div className={styles.icon}>
                  <Typography.Title level={1} className={styles.scales}>
                    {item.description.match(/\d+/) || 15}
                  </Typography.Title>
                  <img alt='' src={item.icon} />
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
