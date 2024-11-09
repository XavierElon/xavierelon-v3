'use client'

import { useState } from 'react'
import GridLayout from '../../components/bento/GridLayout'

export enum TabKey {
  Home = 'Home',
  Work = 'Work',
  Blog = 'Blog',
  Contact = 'Contact'
}

function Bento() {
  const [tab, setTab] = useState<TabKey>(TabKey.Home)

  const tabOffsets: { [key in TabKey]: number } = {
    Home: 0,
    Work: 1,
    Blog: 2,
    Contact: 3
  }

  const baseX = 520
  const baseW = 221.5

  const x = baseX + tabOffsets[tab] * baseW
  const w = baseW

  return (
    <main className="bg-[#f7f2f2]">
      <GridLayout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
    </main>
  )
}

export default Bento
