/* eslint-disable @delagen/deprecation/deprecation */
import md5 from 'md5'
import React, { useEffect, useRef } from 'react'

const range = (n: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
  return ((n - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

interface IdenticonProps {
  bg?: string
  className?: string
  count?: number
  fg?: string
  padding?: number
  palette?: string[]
  size?: number
  value?: string
}

const updateCanvas = (canvas: React.RefObject<HTMLCanvasElement>, props: IdenticonProps) => {
  const { value = '', size = 400, bg = 'transparent', count = 5, palette, padding = 0 } = props
  let { fg } = props
  const hash = md5(value)
  const block = Math.floor(size / count)
  const hashcolor = hash.slice(0, 6)

  const current = canvas.current

  if (!current) {
    return
  }

  if (palette && palette.length) {
    const index = Math.floor(range(parseInt(hash.slice(-3), 16), 0, 4095, 0, palette.length))
    fg = palette[index]
  }

  const pad = padding
  current.width = block * count + pad
  current.height = block * count + pad
  const arr = hash.split('').map((el) => {
    const parsedEl = parseInt(el, 16)
    if (parsedEl < 8) {
      return 0
    } else {
      return 1
    }
  })

  const map = []

  map[0] = map[4] = arr.slice(0, 5)
  map[1] = map[3] = arr.slice(5, 10)
  map[2] = arr.slice(10, 15)

  const ctx = current.getContext('2d')
  if (ctx) {
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, current.width, current.height)

    map.forEach((row, i) => {
      row.forEach((el, j) => {
        if (el) {
          ctx.fillStyle = fg ? fg : '#' + hashcolor
          ctx.fillRect(block * i + pad, block * j + pad, block - pad, block - pad)
        } else {
          ctx.fillStyle = bg
          ctx.fillRect(block * i + pad, block * j + pad, block - pad, block - pad)
        }
      })
    })
  }
}

/** @deprecated Moved to @xylabs/sdk-react */
const Identicon: React.FC<IdenticonProps> = (props) => {
  const { size = 400, className = 'identicon' } = props

  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    updateCanvas(canvas, props)
  })

  return <canvas className={className} ref={canvas} style={{ height: size, width: size }} />
}

export default Identicon
