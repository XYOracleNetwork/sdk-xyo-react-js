import { ReactNode } from 'react'

export interface PropertyAction {
  disabled?: boolean
  name: string
  icon?: ReactNode
  onClick?: () => void
}
