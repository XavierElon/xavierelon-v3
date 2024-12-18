'use client'

import React, { useState } from 'react'
import GridLayout from './GridLayout'
import Navbar from './Navbar'
import BackgroundBeams from './aceternity/BackgroundBeams'
import CursorGradient from './custom/CursorGradient/CursorGradient'
import AuroraBackground from './aceternity/AuroraBackground'
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react'
import FloatingNavbar from './aceternity/FloatingNavbar'
import { TabKey } from '@/interfaces/enums'

const navItems = [
  {
    name: 'Home',
    link: '/',
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
  },
  {
    name: 'About',
    link: '/about',
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
  },
  {
    name: 'Contact',
    link: '/contact',
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
  }
]

const GridBackground = () => {
  const [tab, setTab] = useState<TabKey>(TabKey.Overview)

  const tabOffsets: { [key in TabKey]: number } = {
    [TabKey.Overview]: 0,
    [TabKey.About]: 1,
    [TabKey.Work]: 2,
    [TabKey.Projects]: 3,
    [TabKey.Contact]: 4
    // [TabKey.Blog]: 5
  }

  const baseX = 10
  const baseW = 200

  const x = baseX + tabOffsets[tab] * baseW
  const w = baseW

  return (
    <div className="relative w-full min-h-screen">
      {' '}
      {/* Base grid background */}
      <div className="absolute inset-0 bg-[#090c10] bg-[length:100px_100px] bg-grid-white/[0.10] z-0"></div>
      {/* Color streaks overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-teal-900/40 z-10"></div>
      {/* Radial gradient for the faded look */}
      <div className="absolute inset-0 bg-[#090c10] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
      {/* AuroraBackground Overlay */}
      {/* <AuroraBackground className="absolute inset-0 z-20" showRadialGradient={true} /> */}
      {/* Main Content */}
      <div className="">
        {/* Content */}
        <div className="relative z-40 flex items-center justify-center">
          <GridLayout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
        </div>
      </div>
    </div>
  )
}

export default GridBackground
