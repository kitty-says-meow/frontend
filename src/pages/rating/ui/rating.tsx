import { Alert, Table } from 'antd'
import { PageTitle } from 'shared/ui'
import styles from './rating.module.scss'
import { useRating, useUserProfile } from 'entities/users/lib'
import { useMemo } from 'react'
import { declOfNum } from 'shared/lib'
import { Link } from 'react-router-dom'

const columns = [
  {
    key: `index`,
    title: `Место`,
    dataIndex: `name`,
    render: (_: unknown, rating: Components.Schemas.Rating, index: number) =>
      index + 1,
  },
  {
    key: `name`,
    title: `Имя`,
    dataIndex: `name`,
    render: (_: unknown, rating: Components.Schemas.Rating) => (
      <Link to={rating.username}>
        {rating.firstName} {rating.lastName}
      </Link>
    ),
  },
  {
    key: `isu`,
    title: `ИСУ`,
    dataIndex: `username`,
    render: (name: string) => <Link to={name}>{name}</Link>,
  },
  {
    key: `isGetting`,
    title: `Попадаешь в ПГАС?`,
    dataIndex: `pgasScore`,
    render: (score: number, rating: Components.Schemas.Rating, index: number) =>
      index < 30 && !!score ? `Да` : `Нет`,
  },
  {
    key: `score`,
    title: `Баллы`,
    dataIndex: `pgasScore`,
  },
]

export const Rating = () => {
  const { data: rating } = useRating()
  const { data: profile } = useUserProfile()

  const isGettingPGAS = useMemo(() => {
    const index = rating?.findIndex(
      (column) => column.username === profile?.username,
    )

    return index !== undefined && index < 30
  }, [rating, profile?.username])

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
        dataSource={rating?.map((rating) => ({
          ...rating,
          key: rating.username,
        }))}
        pagination={false}
      />
    </>
  )
}
