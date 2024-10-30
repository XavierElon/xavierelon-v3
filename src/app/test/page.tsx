'use client'

import clsx from 'clsx'
import { StarGrid } from '../../components/lunar/StarGrid'
import CursorGradient from '@/components/CursorGradient'

interface StarGridItemProps {
  isActive: boolean
  isFeatured: boolean
}

export default function Test() {
  const columns = 60
  const rows = 30
  const totalStars = columns * rows
  const items = Array(totalStars).fill(0)

  return (
    <div className="w-screen h-screen">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-teal-900/40 z-10"></div> */}

      <CursorGradient radius={100} dotSize={10} ringSize={40} ringThickness={2} />
      <StarGrid
        active={20} // Maximum number of stars to activate at once
        featured={10} // Maximum number of stars to feature at once
        minActiveDuration={200} // Minimum time a star stays active
        maxActiveDuration={1500} // Maximum time a star stays active
        minFeatureDuration={500} // Minimum time a star stays featured
        maxFeatureDuration={2000} // Maximum time a star stays featured
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}>
        {items.map((item, index) => (
          <StarGrid.Item key={index} className="relative flex aspect-square w-full items-center justify-center">
            {({ isActive, isFeatured }: StarGridItemProps) => (
              <>
                <svg className={clsx(isFeatured ? 'scale-1' : 'scale-0 opacity-0', 'absolute h-6 w-6 stroke-cyan-400/50 stroke-[1] transition-all duration-1000')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10.5" />
                </svg>

                <div
                  style={{ '--duration': `${(index % 3) * 1.5}s` }}
                  className={clsx(
                    {
                      'scale-50 bg-white/20': !isActive && !isFeatured,
                      'h-2 w-2 ': isActive || isFeatured,
                      'bg-white/30': isActive && !isFeatured,
                      'bg-cyan-400': isFeatured
                    },
                    'relative h-1 w-1 rounded-full transition-all duration-500 [animation-duration:--duration]'
                  )}></div>
              </>
            )}
          </StarGrid.Item>
        ))}
      </StarGrid>
    </div>
  )
}
