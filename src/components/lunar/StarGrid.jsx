'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const RootContext = createContext()

export function Root({ active = 1, featured = 1, minActiveDuration = 500, maxActiveDuration = 2000, minFeatureDuration = 1000, maxFeatureDuration = 3000, as: Component = 'div', children, className, ...props }) {
  const container = useRef(null)
  const [childElements, setChildElements] = useState([])

  const [activeItems, setActiveItems] = useState([])
  const [featuredItems, setFeaturedItems] = useState([])

  const [items, setItems] = useState([])

  useEffect(() => {
    if (container.current) {
      setChildElements(Array.from(container.current.children))
    }
  }, [])

  useEffect(() => {
    setItems(Array.from({ length: children.length }, (_, i) => i))
  }, [children])

  useEffect(() => {
    let isCancelled = false

    const activateRandomStars = () => {
      if (isCancelled) return

      // Determine how many stars to activate
      const numToActivate = Math.floor(Math.random() * active) + 1

      // Randomly select stars to activate
      const availableItems = items.filter((item) => !activeItems.some((activeItem) => activeItem.index === item))
      const shuffledItems = availableItems.sort(() => 0.5 - Math.random())
      const itemsToActivate = shuffledItems.slice(0, numToActivate)

      const now = Date.now()
      const newActiveItems = itemsToActivate.map((item) => ({
        index: item,
        expirationTime: now + Math.random() * (maxActiveDuration - minActiveDuration) + minActiveDuration
      }))

      setActiveItems((prevItems) => [...prevItems, ...newActiveItems])

      // Schedule the next activation
      const nextActivationTime = Math.random() * 1000 // Random time between 0 and 1000ms
      setTimeout(activateRandomStars, nextActivationTime)
    }

    const featureRandomStars = () => {
      if (isCancelled) return

      // Determine how many stars to feature
      const numToFeature = Math.floor(Math.random() * featured) + 1

      // Randomly select stars to feature
      const availableItems = items.filter((item) => !featuredItems.some((featuredItem) => featuredItem.index === item))
      const shuffledItems = availableItems.sort(() => 0.5 - Math.random())
      const itemsToFeature = shuffledItems.slice(0, numToFeature)

      const now = Date.now()
      const newFeaturedItems = itemsToFeature.map((item) => ({
        index: item,
        expirationTime: now + Math.random() * (maxFeatureDuration - minFeatureDuration) + minFeatureDuration
      }))

      setFeaturedItems((prevItems) => [...prevItems, ...newFeaturedItems])

      // Schedule the next feature activation
      const nextFeatureTime = Math.random() * 2000 // Random time between 0 and 2000ms
      setTimeout(featureRandomStars, nextFeatureTime)
    }

    // Start the random activation loops
    activateRandomStars()
    featureRandomStars()

    // Cleanup on unmount
    return () => {
      isCancelled = true
    }
  }, [items])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setActiveItems((prevItems) => prevItems.filter((item) => item.expirationTime > now))
      setFeaturedItems((prevItems) => prevItems.filter((item) => item.expirationTime > now))
    }, 100) // Check every 100ms

    return () => clearInterval(interval)
  }, [])

  const context = {
    peers: childElements,
    activeItems,
    featuredItems
  }

  return (
    <RootContext.Provider value={context}>
      <Component ref={container} className={className} {...props}>
        {children}
      </Component>
    </RootContext.Provider>
  )
}

export function Item({ as: Component = 'div', children, className, ...props }) {
  const rootContext = useContext(RootContext)
  const container = useRef(null)

  const index = useMemo(() => {
    return rootContext.peers ? rootContext.peers.indexOf(container.current) : -1
  }, [rootContext.peers])

  const isActive = useMemo(() => rootContext.activeItems.some((item) => item.index === index), [rootContext.activeItems, index])
  const isFeatured = useMemo(() => rootContext.featuredItems.some((item) => item.index === index), [rootContext.featuredItems, index])

  return (
    <Component ref={container} className={className} {...props}>
      {children({ isActive, isFeatured })}
    </Component>
  )
}

export const StarGrid = Object.assign(Root, { Item })
