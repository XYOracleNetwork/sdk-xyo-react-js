import { useEffect, useState } from 'react'

interface Size {
  height: number | undefined
  width: number | undefined
}

function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    height: undefined,
    width: undefined,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useWindowSize
