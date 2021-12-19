import {
  EnvironmentOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
  TrophyOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { Drawer, Menu } from 'antd'
import { motion } from 'framer-motion'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { getUser } from 'shared/api'
import { routingTransitionDuration, PATH } from 'shared/config'
import { ReactComponent as LogoSVG } from './logo.svg'

import styles from './layout.module.scss'
import { useUserProfile } from 'entities/users/lib'
import { useIsDesktop } from 'shared/lib'

interface Props {
  children: ReactNode
}

const Logo = () => <LogoSVG className={styles.logo} />

export const Layout = ({ children }: Props) => {
  const history = useHistory()
  const location = useLocation()
  const { id } = getUser()
  const { data: profile } = useUserProfile()
  const { isDesktop } = useIsDesktop()

  const getKey = useCallback(
    (link: string) => link.split(`/`).filter(Boolean)[0],
    [],
  )

  const pages = useMemo<
    { link: string; title: string; icon: ReactNode }[]
  >(() => {
    const pages = [
      { title: `Моя страница`, link: `/${id}`, icon: <EnvironmentOutlined /> },
      { title: `Мероприятия`, link: PATH.EVENTS, icon: <UserOutlined /> },
      { title: `Рейтинг`, link: PATH.RATING, icon: <StarOutlined /> },
      { title: `Достижения`, link: PATH.TROPHIES, icon: <TrophyOutlined /> },
    ]

    if (profile?.departments.length) {
      pages.push({
        title: `Мои клубы`,
        link: PATH.CLUBS,
        icon: <SmileOutlined />,
      })
    }

    return pages
  }, [id, profile?.departments.length])

  const keys = useMemo(() => {
    const page = pages.find((page) =>
      location.pathname.includes(getKey(page.link)),
    )

    if (page) {
      return [page.link]
    }

    if (/^\/\d$/.test(location.pathname)) {
      return [pages[0].link]
    }

    return []
  }, [getKey, location.pathname, pages])

  const menu = useMemo(
    () => (
      <Menu className={styles.menu} mode='inline' selectedKeys={keys}>
        {isDesktop && <Logo />}
        {pages.map(({ title, link, icon }) => (
          <Menu.Item
            key={link}
            className={styles.menuItem}
            icon={icon}
            onClick={() => {
              setIsOpen(false)
              history.push(link)
            }}
          >
            {title}
          </Menu.Item>
        ))}
      </Menu>
    ),
    [history, isDesktop, keys, pages],
  )

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isDesktop && (
        <header className={styles.header}>
          <LogoSVG className={styles.image} />
          <MenuOutlined
            className={styles.menuIcon}
            onClick={() => setIsOpen(true)}
          />
        </header>
      )}
      <div className={styles.wrapper}>
        {isDesktop ? (
          menu
        ) : (
          <Drawer
            className={styles.drawer}
            width='80%'
            visible={isOpen}
            onClose={() => setIsOpen(false)}
          >
            {menu}
          </Drawer>
        )}
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.content}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: routingTransitionDuration }}
        >
          {children}
        </motion.div>
      </div>
    </>
  )
}
