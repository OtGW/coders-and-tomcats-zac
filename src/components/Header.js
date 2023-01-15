import React from 'react'
import { Header as MantineHeader } from '@mantine/core'
import LoginButton from './LoginButton'
import { Image } from '@mantine/core'
import './Styles.css'

const Header = () => {
  return (
    <MantineHeader height={70} style={{ width: '100%' }}>
      <div className="head">
        <Image
          src="Ugly website photo dump\USE THESE PHOTOS\Logos\JuicyBootcamp logo.jpg"
          width={'150px'}
        />
        <LoginButton />
      </div>
    </MantineHeader>
  )
}

export default Header
