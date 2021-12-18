import { UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { motion } from 'framer-motion'
import { ReactNode, useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { getUser } from 'shared/api'
import { routingTransitionDuration, PATH } from 'shared/config'

import styles from './layout.module.scss'

interface Props {
  children: ReactNode
}

const Logo = () => (
  <img
    alt=''
    className={styles.logo}
    src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg'
  />
)

export const Layout = ({ children }: Props) => {
  const history = useHistory()
  const location = useLocation()
  const { id } = getUser()

  const getKey = useCallback(
    (link: string) => link.split(`/`).filter(Boolean)[0],
    [],
  )

  const pages = useMemo<{ link: string; title: string; icon: ReactNode }[]>(
    () => [
      { title: `Моя страница`, link: id, icon: <UserOutlined /> },
      { title: `Мероприятия`, link: PATH.EVENTS, icon: <UserOutlined /> },
      { title: `Рейтинг`, link: PATH.RATING, icon: <UserOutlined /> },
      { title: `Мои клубы`, link: PATH.CLUBS, icon: <UserOutlined /> },
    ],
    [id],
  )

  const key = useMemo(
    () =>
      (
        pages.find((page) => location.pathname.includes(getKey(page.link))) ||
        pages[0]
      ).link,
    [getKey, location.pathname, pages],
  )

  return (
    <div className={styles.wrapper}>
      <Menu className={styles.menu} mode='inline' selectedKeys={[key]}>
        <Logo />
        {pages.map(({ title, link, icon }) => (
          <Menu.Item
            key={link}
            className={styles.menuItem}
            icon={icon}
            onClick={() => history.push(link)}
          >
            {title}
          </Menu.Item>
        ))}
      </Menu>
      <motion.header
        animate={{ opacity: 1 }}
        className={styles.content}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: routingTransitionDuration }}
      >
        {children}
      </motion.header>
    </div>
  )
}
