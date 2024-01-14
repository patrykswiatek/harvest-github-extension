import type { FC } from 'react'

import styles from '@/components/header/Header.module.scss'
import type { HeaderProps } from '@/types/props/header.props'


const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header className={styles.Header}>
      <img className={styles.avatar} src={user?.avatarUrl} alt='User avatar' />
      <span>{user?.name}</span>
    </header>
  )
}

export default Header
