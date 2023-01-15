import React from 'react'
import { Footer as MantineFooter, Tooltip } from '@mantine/core'
import { Image } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import './Styles.css'

const Footer = () => {
  return (
    <MantineFooter height={63}>
      <div className="foot">
        <Image
          src="Ugly website photo dump\USE THESE PHOTOS\Logos\Myspace.png"
          width={100}
        />
        <Image
          src="Ugly website photo dump\USE THESE PHOTOS\Logos\Xanga-altered.png"
          width={100}
        />
        <Tooltip label="Cheat Codes - try them on this page, nerd">
          <a
            href="https://codepen.io/WeiChiaChang/full/xLQVXm?editors=1100"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="Ugly website photo dump\USE THESE PHOTOS\CheatCodes.jpg"
              width={100}
            />
          </a>
        </Tooltip>
      </div>
    </MantineFooter>
  )
}

export default Footer
