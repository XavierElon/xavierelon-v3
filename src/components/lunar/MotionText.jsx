import { useMemo } from 'react'

export function MotionText({ body, mode = 'symbol', className, children, as: Component = 'div', ...props }) {
  const tokens = useMemo(() => {
    if (mode == 'symbol') {
      return body.trim().split('')
    }

    return body.trim().match(/\S+|\s+/g) || []
  }, [body, mode])

  return (
    <Component className={className} {...props}>
      {children(tokens)}
    </Component>
  )
}
