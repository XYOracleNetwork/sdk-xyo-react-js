import type { Map } from 'mapbox-gl'
import type { RefObject } from 'react'
import { useEffect, useMemo } from 'react'

/**
 * Inspired by - https://bl.ocks.org/danswick/fc56f37c10d40be62e4feac5984250d2
 */
export const useDynamicMapResize = (
  mapContainerRef: RefObject<HTMLDivElement | null>,
  mapCanvasRef: RefObject<HTMLCanvasElement | null>,
  mapInstance?: Map,
  active = true,
) => {
  const resizer = useMemo(
    () =>
      new ResizeObserver(() => {
        const width = mapContainerRef.current?.getBoundingClientRect().width
        if (width && mapCanvasRef.current) {
          mapCanvasRef.current.style.width = `${width}px`
          // setTimeout allows for the smoothest animation (vs requestAnimationFrame, debouce, etc)
          // likely because it lets mapbox resize once when the event loop is ready?
          setTimeout(() => mapInstance?.resize())
        }
      }),
    [mapCanvasRef, mapContainerRef, mapInstance],
  )

  const dependenciesReady = useMemo(() => {
    return !!(active && mapInstance && mapContainerRef?.current && mapCanvasRef.current)
  }, [active, mapCanvasRef, mapContainerRef, mapInstance])

  useEffect(() => {
    if (dependenciesReady) {
      if (mapContainerRef.current) {
        resizer.observe(mapContainerRef.current)
      }

      return () => {
        resizer.disconnect()
      }
    }
  }, [active, dependenciesReady, mapCanvasRef, mapContainerRef, mapInstance, resizer])
}
