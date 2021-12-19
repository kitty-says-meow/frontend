import { Alert, Table } from 'antd'
import { PageTitle } from 'shared/ui'
import styles from './rating.module.scss'
import { useRating, useUserProfile } from 'entities/users/lib'
import { useMemo } from 'react'
import { declOfNum, useIsDesktop } from 'shared/lib'
import { Link } from 'react-router-dom'

export const Rating = () => {
  const { data: rating } = useRating()
  const { data: profile } = useUserProfile()
  const { isDesktop } = useIsDesktop()

  const isGettingPGAS = useMemo(() => {
    const index = rating?.findIndex(
      (column) => column.username === profile?.username,
    )

    return index !== undefined && !!profile?.pgasScore && index < 30
  }, [rating, profile?.pgasScore, profile?.username])

  const message = useMemo(() => {
    if (!rating || !profile) {
      return
    }

    if (isGettingPGAS) {
      return `Поздравляю! Ты будешь получать ПГАС!`
    }

    if (profile?.pgasScore === 0) {
      return `Для участия в борьбе за ПГАС тебе нужны баллы за активность`
    }

    const delta = rating[29]?.pgasScore - profile?.pgasScore + 1

    return `Тебе нужно набрать еще ${delta} ${declOfNum(delta, [
      `балл`,
      `балла`,
      `баллов`,
    ])} и ты будешь получать ПГАС!`
  }, [isGettingPGAS, profile, rating])

  const columns = useMemo(() => {
    const columns = [
      {
        key: `index`,
        title: `Место`,
        dataIndex: `name`,
        render: (
          _: unknown,
          rating: Components.Schemas.Rating,
          index: number,
        ) => index + 1,
      },
      {
        key: `isu`,
        title: `ИСУ`,
        dataIndex: `username`,
        render: (name: string) => <Link to={name}>{name}</Link>,
      },
      {
        key: `score`,
        title: `Баллы`,
        dataIndex: `pgasScore`,
      },
    ]

    if (isDesktop) {
      columns.push({
        key: `name`,
        title: `Имя`,
        dataIndex: `name`,
        // @ts-ignore
        render: (_: unknown, rating: Components.Schemas.Rating) => (
          <Link to={rating.username}>
            {rating.firstName} {rating.lastName}
          </Link>
        ),
      })
      columns.push({
        key: `isGetting`,
        title: `Попадает в ПГАС?`,
        dataIndex: `pgasScore`,
        // @ts-ignore
        render: (
          score: number,
          rating: Components.Schemas.Rating,
          index: number,
        ) => (index < 30 && !!score ? `Да` : `Нет`),
      })
    }

    return columns
  }, [isDesktop])

  return (
    <>
      <PageTitle title='Рейтинг' />
      <Alert
        className={styles.alert}
        message={message}
        type={isGettingPGAS ? `success` : `error`}
        showIcon
      />
      <Table
        className={styles.table}
        columns={columns}
        rowClassName={(record) =>
          record.username === profile?.username ? styles.myRow : ``
        }
        dataSource={rating?.map((rating) => ({
          ...rating,
          key: rating.username,
        }))}
        pagination={false}
      />
    </>
  )
}
