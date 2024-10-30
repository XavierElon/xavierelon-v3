'use client'

import clsx from 'clsx'
import { StarGrid } from '../../components/lunar/StarGrid'
import CursorGradient from '@/components/CursorGradient'
import { FluidNavigation } from '@/components/lunar/FluidNavigation'

interface StarGridItemProps {
  isActive: boolean
  isFeatured: boolean
}

export default function Test() {
  const columns = 60
  const rows = 30
  const totalStars = columns * rows
  const items = Array(totalStars).fill(0)

  const navItems = ['Overview', 'Integrations', 'Activity', 'Domains', 'Usage', 'Monitoring']

  function navigate() {
    // the callback is fired once the animation is completed
    // to allow smooth transition
  }

  return (
    <div className="w-screen h-screen">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-teal-900/40 z-10"></div> */}
      <div className="mx-auto shrink-0 overflow-hidden rounded-full">
        <FluidNavigation as="nav" className="relative rounded-full border border-white/10 bg-white/5 p-2">
          {({ ready, size, position, duration }: any) => (
            <div
              style={{
                '--size': size,
                '--position': position,
                '--duration': duration
              }}
            >
              <div className={clsx({ hidden: !ready }, 'absolute bottom-0 h-1/2 w-[var(--size)] translate-x-[var(--position)] bg-white/75 blur-xl transition-[width,transform] duration-[--duration]')}></div>

              <div className="absolute inset-0 rounded-full bg-transparent"></div>

              <div className="relative">
                <div className={clsx({ hidden: !ready }, 'absolute inset-y-0 h-full w-[var(--size)] translate-x-[var(--position)] rounded-full bg-white/10 transition-[width,transform] duration-[--duration]')}></div>
                <div className={clsx({ hidden: !ready }, 'absolute bottom-0 h-1/3 w-[var(--size)] translate-x-[var(--position)] rounded-full bg-white opacity-20 blur-md transition-[width,transform] duration-[--duration]')}></div>

                <FluidNavigation.List as="ul" className="relative flex items-center gap-3">
                  {navItems.map((item, index) => (
                    <FluidNavigation.Item key={index} as="li" onActivated={navigate}>
                      {({ setActive, isActive }: any) => (
                        <a href="#" className={clsx([isActive ? 'text-white/75 text-shadow-sm' : 'text-white/60 hover:text-white/75'], 'inline-block px-4 py-1.5 text-sm font-light transition-[text-shadow,color] duration-300')} onClick={setActive}>
                          {item}
                        </a>
                      )}
                    </FluidNavigation.Item>
                  ))}
                </FluidNavigation.List>
              </div>
            </div>
          )}
        </FluidNavigation>
      </div>

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
        }}
      >
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
                  )}
                ></div>
              </>
            )}
          </StarGrid.Item>
        ))}
      </StarGrid>
    </div>
  )
}
