import { InfoCircleOutlined } from '@ant-design/icons'
import { Card, Typography, Tooltip } from 'antd'
import { ReactNode } from 'react'

import styles from './score-card.module.scss'

interface Props {
  label: string
  info: string
  value?: number
  children: ReactNode
}

export const ScoreCard = ({ label, info, value, children }: Props) => {
  return (
    <Card>
      <Tooltip title={info}>
        <InfoCircleOutlined />
      </Tooltip>
      <Typography.Text className={styles.title}>{label}</Typography.Text>
      <p>{value}</p>
      <div className={styles.footer}>{children}</div>
    </Card>
  )
}
