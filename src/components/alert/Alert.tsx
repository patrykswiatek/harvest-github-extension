import type { FC } from 'react'

import styles from '@/components/alert/Alert.module.scss'
import type { AlertProps } from '@/types/props/alert.props'

const Alert: FC<AlertProps> = ({ className, text, type }) => {
  return <p className={`${styles.Alert} ${styles[`Alert--${type}`]} ${className ?? ''}`}>{text}</p>
}

export default Alert
