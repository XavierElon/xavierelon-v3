'use client'

import clsx from 'clsx'
import { StarGrid } from '../../components/lunar/StarGrid'

interface StarGridItemProps {
  isActive: boolean
  isFeatured: boolean
}

export default function Test() {
  const items = Array(40).fill(0)

  return (
    <div className="flex h-screen w-screen items-center px-8">
      <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/5 bg-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"></div>

        <div className="px-6 pt-6">
          <StarGrid active={20} duration={100} featureDuration={1500} className="grid w-full grid-cols-10 gap-4">
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
                          'scale-50 bg-white/10': !isActive && !isFeatured,
                          'h-1 w-1 ': isActive || isFeatured,
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

        <div className="mt-6 px-8 pb-8">
          <div className="text-lg text-white">Issue detector</div>

          <p className="mt-2 text-sm font-light leading-relaxed text-white/75">Spot bugs, catch common issues, and fix them automatically, before they pop up in production.</p>
        </div>
      </div>
    </div>
  )
}
