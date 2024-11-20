'use client'

import React, { useState, useEffect } from 'react'

interface CursorGradientProps {
  radius?: number // Radius in pixels for the gradient circle
  dotSize?: number // Diameter in pixels for the central dot
  ringSize?: number // Diameter in pixels for the ring around the cursor
  ringThickness?: number // Thickness in pixels for the ring border
}

const CursorGradient: React.FC<CursorGradientProps> = ({
  radius = 100, // Default radius
  dotSize = 10, // Default dot size
  ringSize = 75, // Default ring diameter
  ringThickness = 2 // Default ring border thickness
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })

      // Update ring position with a slight delay
      setTimeout(() => {
        setRingPosition({ x: clientX, y: clientY })
      }, 15) // Adjust the delay as needed
    }

    window.addEventListener('mousemove', updatePosition)

    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <>
      {/* Outer Ring with Delay */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: `${ringPosition.x - ringSize / 2}px`,
          top: `${ringPosition.y - ringSize / 2}px`,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `${ringThickness}px solid rgba(0, 0, 0, 0.8)`, // Adjust color and opacity as needed
          borderRadius: '50%',
          zIndex: 9998,
          // Optional: Apply transition for smoother movement
          transition: 'left 0.15s ease-out, top 0.15s ease-out'
        }}
      />
      {/* Gradient background */}
      <div
        className="fixed pointer-events-none rounded-full rotating-gradient"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          transform: 'translate(-50%, -50%)',
          background: 'conic-gradient(#3effe8, #8c0fee, #3effe8)',
          filter: 'blur(60px)',
          zIndex: -1
        }}
      />
      {/* Midpoint White Circle */}
      <div
        className="fixed pointer-events-none rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${radius}px`,
          height: `${radius}px`,
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity as needed
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      />
      {/* Central White Dot */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: '#000',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999
        }}
      />
    </>
  )
}

export default CursorGradient
