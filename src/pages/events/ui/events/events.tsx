import { PageTitle } from 'shared/ui'
import { EventCard } from 'widgets/events/ui'
import styles from './events.module.scss'
import { Tabs } from 'antd'

export const Events = () => {
  return (
    <>
      <Tabs className={styles.tabs} defaultActiveKey='1'>
        <Tabs.TabPane tab='Учебные' key='1' />
        <Tabs.TabPane tab='Научно-исследовательские' key='2' />
        <Tabs.TabPane tab='Общественные' key='3' />
        <Tabs.TabPane tab='Культурно-творческие' key='4' />
        <Tabs.TabPane tab='Спортивные' key='5' />
      </Tabs>
      <PageTitle title='Учебные мероприятия' />
      <div className={styles.wrapper}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  )
}
