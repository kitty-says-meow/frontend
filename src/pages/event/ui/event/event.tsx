import { PageTitle } from 'shared/ui'
import { Avatar, Button, Card, Divider, List, Tag, Typography } from 'antd'

import styles from './event.module.scss'
import { useEvent } from 'entities/events/lib'
import { useParams } from 'react-router-dom'
import { Fragment, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ru'
import { categories, roles, statuses, statusToColor } from 'shared/config'
import { declOfNum } from 'shared/lib'
import { useUserProfile } from 'entities/users/lib'
import { ReportModal } from 'pages/event/ui/report-modal/report-modal'

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const { data: event } = useEvent(eventId)
  const { data: profile } = useUserProfile()
  const [isVisible, setIsVisible] = useState(false)

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
            <img
              alt=''
              className={styles.image}
              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            />
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
          <Button block className={styles.button} size='large' type='primary'>
            Записаться
          </Button>
          {profile?.departments.find(
            (department) => department.id === event?.department.id,
          ) &&
            event?.status === 4 && (
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
            Участники
          </Typography.Title>
          <List
            className={styles.list}
            dataSource={[
              {
                title: `Title`,
                score: 123,
                image: `https://joeschmoe.io/api/v1/random`,
              },
              {
                title: `Title`,
                score: 123,
                image: `https://joeschmoe.io/api/v1/random`,
              },
            ]}
            itemLayout='horizontal'
            renderItem={(item) => (
              <List.Item className={styles.item}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className={styles.avatar}
                      src='https://joeschmoe.io/api/v1/random'
                    />
                  }
                  title={
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                  }
                />
              </List.Item>
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
