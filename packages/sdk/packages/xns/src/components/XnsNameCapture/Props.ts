import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ReactNode } from 'react'
import type { To } from 'react-router-dom'

export interface XnsNameCaptureBuyCallbacks {
  onCaptureName?: (name: string) => Promise<void>
}

/**
 * Trackers for user actions
 */
export interface XnsNameCaptureTrackingProps {
  funnel?: string
  intent?: string
  placement?: string
}

/**
 * Properties derived from the route and used for navigation
 */
export interface XnsNameCaptureRoutingProps {
  navigate?: (to: string) => void
  paramsString?: string
  routingError?: Error
  to?: To
}

/**
 * Base properties for the XnsNameCapture component related to the UI and Events
 */
export interface XnsNameCaptureBaseProps {
  autoFocus?: boolean
  buttonText?: string
  defaultXnsName?: string
  disabled?: boolean
  errorUi?: 'alert' | 'toast'
  mobileButtonText?: string
  onNameChange?: (name: string) => void
  showSecondary?: boolean | ReactNode
}

export interface XnsNameCaptureProps extends XnsNameCaptureBaseProps,
  XnsNameCaptureTrackingProps,
  XnsNameCaptureBuyCallbacks,
  XnsNameCaptureRoutingProps,
  FlexBoxProps {}

export type WithXnsCapture<T> = T & { XnsCapture?: React.FC<XnsNameCaptureProps> }
