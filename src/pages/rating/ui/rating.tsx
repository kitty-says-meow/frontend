import { Alert, Card, Table, Typography } from 'antd'
import { PageTitle } from 'shared/ui'
import styles from './rating.module.scss'
import { useRating, useRatingData, useUserProfile } from 'entities/users/lib'
import { useMemo } from 'react'
import { declOfNum, useIsDesktop } from 'shared/lib'
import { Link } from 'react-router-dom'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import moment from 'moment'

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

  const { data: ratingData } = useRatingData()

  type Obj = {
    name: string
    sum: number
    data: { timestamp: number; value: number }[]
  }[]

  const series = useMemo(() => {
    const arr: Obj = []

    ratingData?.forEach((data) => {
      let user = arr.find((item) => data.user === item.name)
      if (!user) {
        arr.push({
          name: data.user,
          sum: 0,
          data: [],
        })
        user = arr[arr.length - 1]
      }

      user.sum += data.score
      user.data.push({
        timestamp: +new Date(data.pgasConverted || 0),
        value: user.sum + data.score,
      })
    })

    return arr
  }, [ratingData])

  console.log(series)

  return (
    <>
      <PageTitle title='Рейтинг' />
      <Alert
        className={styles.alert}
        message={message}
        type={isGettingPGAS ? `success` : `error`}
        showIcon
      />
      <Card className={styles.chart}>
        <Typography.Title level={5}>Баллы участников</Typography.Title>
        <ResponsiveContainer width='100%' height='100%' aspect={3}>
          <LineChart width={500} height={300}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='timestamp'
              allowDuplicatedCategory={false}
              tickFormatter={(value) => moment(value).format(`HH:mm`)}
              type='number'
              domain={['auto', 'auto']}
            />
            <YAxis dataKey='value' />
            <Tooltip />
            <Legend />
            {series.map((s) => (
              <Line dataKey='value' data={s.data} name={s.name} key={s.name} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>
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
