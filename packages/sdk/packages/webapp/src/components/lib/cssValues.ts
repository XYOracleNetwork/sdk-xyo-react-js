import type { CSSProperties } from 'react'

export const scrollableWrap: CSSProperties = {
  inset: 0,
  position: 'absolute',
} as const

export const fixedWrap: CSSProperties = {
  inset: 'unset',
  position: 'relative',
} as const

// Making a scrollable vs fixed wrapper and content is an inversion of the wrap and content styles
export const scrollableContent: CSSProperties = { ...fixedWrap } as const

export const fixedContent: CSSProperties = { ...scrollableWrap } as const
