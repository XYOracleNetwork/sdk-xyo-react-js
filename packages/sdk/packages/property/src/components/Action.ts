import { ReactNode } from 'react'

export interface PropertyAction {
  disabled?: boolean
  icon?: ReactNode
  name: string
  onClick?: () => void
}
