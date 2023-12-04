import type { FC } from 'react'

import type { HeaderProps } from '@/types/props/header.props'

import '@/components/header/Header.css'

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header className='Header'>
      <img className='avatar' src={user?.avatarUrl} alt='User avatar' />
      <span>{user?.name}</span>
    </header>
  )
}

export default Header
