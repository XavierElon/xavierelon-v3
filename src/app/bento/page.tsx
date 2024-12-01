'use client'

import { useState } from 'react'
import GridLayout from '../../components/bento/GridLayout'
import { TabKey } from '../../interfaces/enums' // Ensure this path is correct

export default function Bento() {
  const [tab, setTab] = useState<TabKey>(TabKey.Overview)

  const tabOffsets: { [key in TabKey]: number } = {
    Overview: 0,
    About: 1,
    Work: 2,
    Projects: 3,
    Contact: 4
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
