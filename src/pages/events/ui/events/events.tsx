import { PageTitle } from 'shared/ui'
import { EventCard } from 'widgets/events/ui'
import styles from './events.module.scss'
import { Select, Tabs, Typography } from 'antd'
import { useEvents } from 'entities/events/lib'
import { categories, routingTransitionDuration } from 'shared/config'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsDesktop } from 'shared/lib'

export const Events = () => {
  const [tab, setTab] = useState(`1`)
  const { data: events, isValidating } = useEvents(tab)
  const { isDesktop } = useIsDesktop()

  return (
    <>
      {isDesktop ? (
        <Tabs className={styles.tabs} activeKey={tab} onChange={setTab}>
          <Tabs.TabPane tab='Учебные' key='1' />
          <Tabs.TabPane tab='Научно-исследовательские' key='2' />
          <Tabs.TabPane tab='Общественные' key='3' />
          <Tabs.TabPane tab='Культурно-творческие' key='4' />
          <Tabs.TabPane tab='Спортивные' key='5' />
        </Tabs>
      ) : (
        <Select
          className={styles.select}
          options={categories}
          value={parseInt(tab)}
          onChange={(tab) => setTab(tab.toString())}
        />
      )}

      {isDesktop && (
        <PageTitle
          title={
            categories.find((category) => category.value === parseInt(tab))
              ?.label || ``
          }
        />
      )}

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={tab}
          className={styles.wrapper}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: routingTransitionDuration / 2 }}
        >
          {events?.length
            ? events.map((event) => <EventCard key={event.id} event={event} />)
            : !isValidating && (
                <Typography.Paragraph>Мероприятий нет</Typography.Paragraph>
              )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
