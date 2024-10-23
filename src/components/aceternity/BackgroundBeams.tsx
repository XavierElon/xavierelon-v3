'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  const paths = [
    'M0 100 L800 100',
    'M0 200 L800 200',
    'M0 300 L800 300',
    'M0 400 L800 400',
    'M0 500 L800 500',

    // Diagonal lines
    'M0 0 L800 600',
    'M0 100 L700 800',
    'M100 0 L800 700',

    // Curved lines
    'M0 500 Q400 0 800 500',
    'M0 0 Q400 600 800 0',

    // Sine wave-like paths
    'M0 300 C200 100 600 500 800 300',
    'M0 200 C200 400 600 0 800 200',

    // Vertical lines
    'M100 0 L100 600',
    'M200 0 L200 600',
    'M300 0 L300 600',
    'M400 0 L400 600',
    'M500 0 L500 600',
    'M600 0 L600 600',
    'M700 0 L700 600',

    // Gentle curves
    'M0 400 C200 350 600 450 800 400',
    'M0 200 C200 250 600 150 800 200'
  ]

  // State to hold the beams
  const [beams, setBeams] = useState<Beam[]>([])

  interface Beam {
    id: number
    pathData: string
    gradientId: string
    duration: number
    pathLength: number
    beamLength: number
  }

  // Use useRef to keep beamId persistent across renders
  const beamIdRef = useRef(0)

  useEffect(() => {
    const maxBeams = 20 // Maximum number of beams at a time

    const interval = setInterval(() => {
      setBeams((prevBeams: any) => {
        if (prevBeams.length >= maxBeams) {
          return prevBeams
        }

        const duration = Math.random() * 5 + 10 // Duration between 5 and 10 seconds
        const newBeamId = beamIdRef.current++
        const pathData = paths[Math.floor(Math.random() * paths.length)]

        // Create a temporary path to calculate its length
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        tempPath.setAttribute('d', pathData)
        document.body.appendChild(tempPath) // Append temporarily to the DOM
        const totalPathLength = tempPath.getTotalLength()
        document.body.removeChild(tempPath) // Remove it from the DOM

        const beamLength = 25 // Beam length in pixels

        const newBeam: Beam = {
          id: newBeamId,
          pathData,
          gradientId: `linearGradient-${newBeamId}`,
          duration,
          pathLength: totalPathLength,
          beamLength
        }

        // Schedule the removal of the beam after its duration
        setTimeout(() => {
          setBeams((currentBeams) => currentBeams.filter((b) => b.id !== newBeamId))
        }, duration * 1000)

        return [...prevBeams, newBeam]
      })
    }, 1000) // Add a new beam every second (adjust as needed)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center', className)}>
      <svg className="z-0 h-full w-full pointer-events-none absolute" width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Define gradients */}
          {beams.map((beam: any) => (
            <linearGradient key={beam.gradientId} id={beam.gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="10%" stopColor="#18CCFC" stopOpacity="1" />
              <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <AnimatePresence>
          {beams.map((beam: any) => (
            <motion.path
              key={beam.id}
              d={beam.pathData}
              stroke={`url(#${beam.gradientId})`}
              strokeWidth="2"
              strokeOpacity="0.6"
              fill="none"
              strokeDasharray={`${beam.beamLength} ${beam.pathLength - beam.beamLength}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -beam.pathLength }}
              transition={{
                duration: beam.duration,
                ease: 'linear'
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
})

BackgroundBeams.displayName = 'BackgroundBeams'

export default BackgroundBeams
