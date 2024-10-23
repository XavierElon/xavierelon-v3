'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const RootContext = createContext()

export function Root({ active = 1, duration = 2000, featureDuration = 1000, as: Component = 'div', children, className, ...props }) {
  const container = useRef(null)
  const [childElements, setChildElements] = useState([])

  const [activeItems, setActiveItems] = useState([])
  const [featuredItem, setFeaturedItem] = useState(0)

  const [items, setItems] = useState([])
  const [distance, setDistance] = useState(null)

  const getAvailableValues = () => {
    return items.filter((value) => {
      return !activeItems.some((activeItem) => {
        return Math.abs(activeItem - value) < distance
      })
    })
  }

  const getRandomValue = () => {
    const values = getAvailableValues()

    if (!values.length) {
      return false
    }

    const index = Math.floor(Math.random() * (values.length - 1))
    return values[index]
  }

  const addItem = () => {
    const value = getRandomValue()

    if (value !== false) {
      setActiveItems((prevItems) => {
        const newItems = [...prevItems, value]
        if (newItems.length > active) {
          newItems.shift()
        }
        return newItems
      })
    }
  }

  const updateFeaturedItem = () => {
    if (!items.length) {
      return
    }

    const availablePlaces = items.filter((value) => {
      return Math.abs(featuredItem - value) > items.length / 3
    })

    const index = Math.floor(Math.random() * (availablePlaces.length - 1))

    setFeaturedItem(availablePlaces[index])
  }

  useEffect(() => {
    const interval = setInterval(() => addItem(), duration)
    const featureInterval = setInterval(() => updateFeaturedItem(), featureDuration)

    return () => {
      clearInterval(interval)
      clearInterval(featureInterval)
    }
  }, [duration, featureDuration, childElements])

  useEffect(() => {
    setItems(Array.from({ length: children.length }, (_, i) => i))
    setDistance(Math.floor(items.length / (active + 1)))

    for (let i = 0; i < active; i++) {
      addItem()
    }

    updateFeaturedItem()
  }, [childElements])

  useEffect(() => {
    if (container.current) {
      setChildElements(Array.from(container.current.children))
    }
  }, [])

  const context = {
    peers: childElements,
    activeItems,
    featuredItem
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

  const isActive = useMemo(() => rootContext.activeItems.includes(index), [rootContext.activeItems, index])
  const isFeatured = useMemo(() => rootContext.featuredItem === index, [rootContext.featuredItem, index])

  return (
    <Component ref={container} className={className} {...props}>
      {children({ isActive, isFeatured })}
    </Component>
  )
}

export const StarGrid = Object.assign(Root, { Item })
