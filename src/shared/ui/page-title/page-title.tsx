import { Typography } from 'antd'

import styles from './page-title.module.scss'

interface Props {
  title: string
}

export const PageTitle = ({ title }: Props) => {
  return (
    <>
      <Typography.Title className={styles.title} level={5}>
        {title}
      </Typography.Title>
    </>
  )
}
