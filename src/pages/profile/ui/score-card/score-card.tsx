import { InfoCircleFilled } from '@ant-design/icons'
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
    <Card className={styles.card}>
      <Tooltip title={info}>
        <InfoCircleFilled className={styles.info} />
      </Tooltip>
      <Typography.Text className={styles.title}>{label}</Typography.Text>
      <p className={styles.value}>{value}</p>
      <div className={styles.footer}>{children}</div>
    </Card>
  )
}
