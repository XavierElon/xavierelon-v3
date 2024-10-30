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
  ringSize = 40, // Default ring diameter
  ringThickness = 2 // Default ring border thickness
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <>
      {/* Ring around the cursor */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          transform: 'translate(-50%, -50%)',
          border: `${ringThickness}px solid rgba(255, 255, 255, 0.8)`, // Adjust color and opacity as needed
          borderRadius: '50%',
          zIndex: 9999
        }}
      />
      {/* Gradient and central dot */}
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
        }}>
        {/* Midpoint White Circle */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust opacity as needed
            transform: 'translate(-50%, -50%)'
          }}
        />
        {/* Central White Dot */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000
          }}
        />
      </div>
    </>
  )
}

export default CursorGradient
