import { PageTitle } from 'shared/ui'
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  notification,
  Tag,
  Typography,
} from 'antd'

import styles from './event.module.scss'
import { joinEvent, useEvent } from 'entities/events/lib'
import { generatePath, useParams } from 'react-router-dom'
import { Fragment, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ru'
import { categories, PATH, roles, statuses, statusToColor } from 'shared/config'
import { declOfNum } from 'shared/lib'
import { useUserProfile } from 'entities/users/lib'
import { ReportModal } from '..'
import { Link } from 'react-router-dom'
import Mock from 'shared/mock.svg'

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const { data: event, mutate } = useEvent(eventId)
  const { data: profile } = useUserProfile()
  const [isVisible, setIsVisible] = useState(false)

  const handleJoin = async () => {
    if (!event) {
      return
    }
    await joinEvent(event?.id)
    notification.success({ message: `Вы записались на мероприятие` })
    await mutate()
  }

  return (
    <>
      <PageTitle title={event?.name || ``} />
      <div className={styles.wrapper}>
        <Tag
          className={styles.tag}
          color={event?.status && statusToColor[event?.status]}
        >
          {statuses.find((status) => status.value === event?.status)?.label}
        </Tag>
        <div>
          <Card>
            <img alt='' className={styles.image} src={event?.image || Mock} />
            {event?.achievements
              .filter(({ name }) => !roles.find(({ value }) => value === name))
              .map((achievement) => (
                <Fragment key={achievement.id}>
                  <Typography.Title className={styles.name} level={5}>
                    {achievement.score}{' '}
                    {declOfNum(achievement.score, [`балл`, `балла`, `баллов`])}
                  </Typography.Title>
                  <Typography.Text>{achievement.name}</Typography.Text>
                </Fragment>
              ))}
          </Card>
          {event?.status === 2 &&
            !profile?.departments.find(
              (department) => department.id === event.department.id,
            ) && (
              <Button
                block
                disabled={
                  !!event.participants.find(
                    (participant) => participant.username === profile?.username,
                  )
                }
                className={styles.button}
                size='large'
                type='primary'
                onClick={handleJoin}
              >
                {!event.participants.find(
                  (participant) => participant.username === profile?.username,
                )
                  ? `Записаться`
                  : `Вы записаны`}
              </Button>
            )}
          {profile?.departments.find(
            (department) => department.id === event?.department.id,
          ) &&
            event &&
            [2, 4].includes(event?.status) && (
              <Button
                block
                className={styles.button}
                size='large'
                type='primary'
                onClick={() => setIsVisible(true)}
              >
                Отправить отчёт
              </Button>
            )}
        </div>
        <div className={styles.right}>
          <Typography.Title level={3}>{event?.name}</Typography.Title>
          <Typography.Paragraph className={styles.description}>
            {event?.description}
          </Typography.Paragraph>
          <div className={styles.dates}>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Дата начала
              </Typography.Title>
              <Typography.Text>
                {event?.dateStart
                  ? moment(event.dateStart).format(`DD MMM YYYY HH:mm`)
                  : `Отсутствует`}
              </Typography.Text>
            </div>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Дата окончания
              </Typography.Title>
              <Typography.Text>
                {event?.dateEnd
                  ? moment(event.dateEnd).format(`DD MMM YYYY HH:mm`)
                  : `Отсутствует`}
              </Typography.Text>
            </div>
            <div className={styles.date}>
              <Typography.Title className={styles.dateTitle} level={5}>
                Категория
              </Typography.Title>
              <Typography.Text>
                {
                  categories.find(
                    (category) => category.value === event?.category,
                  )?.label
                }
              </Typography.Text>
            </div>
          </div>
          <Divider className={styles.hr} />
          <Typography.Title className={styles.dateTitle} level={5}>
            Организатор
          </Typography.Title>
          <Typography.Paragraph>{event?.department.name}</Typography.Paragraph>
          <Divider className={styles.hr} />
          <Typography.Title className={styles.dateTitle} level={5}>
            Участники
          </Typography.Title>
          <List
            className={styles.list}
            dataSource={event?.participants}
            itemLayout='horizontal'
            renderItem={(participant) => (
              <Link
                to={generatePath(PATH.PROFILE, {
                  userId: participant.username,
                })}
              >
                <List.Item className={styles.item}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className={styles.avatar}
                        src={
                          participant.avatar ||
                          `https://joeschmoe.io/api/v1/random`
                        }
                      />
                    }
                    title={
                      <Typography.Title
                        level={5}
                      >{`${participant.firstName} ${participant.lastName}`}</Typography.Title>
                    }
                  />
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
      <ReportModal
        event={event}
        isVisible={isVisible}
        setVisible={setIsVisible}
      />
    </>
  )
}
