import type { UserEventHandler } from '@xylabs/pixel'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { Mixpanel } from 'mixpanel-browser'
import type { ReactNode } from 'react'

export interface XnsNameCaptureBuyCallbacks {
  onBuyName: (name: string) => Promise<void>
}

/**
 * Trackers for user actions
 */
export interface XnsNameCaptureTrackingProps {
  mixpanel?: Mixpanel
  userEvents?: UserEventHandler<Record<string, unknown>>
}

/**
 * Properties derived from the route and used for navigation
 */
export interface XnsNameCaptureRoutingProps {
  paramsString?: string
  to?: string
}

/**
 * Base properties for the XnsNameCapture component related to the UI and Events
 */
export interface XnsNameCaptureBaseProps {
  autoFocus?: boolean
  buttonText?: string
  defaultXnsName?: string
  errorUi?: 'alert' | 'toast'
  event?: string
  funnel?: string
  mobileButtonText?: string
  placement?: string
  showSecondary?: boolean | ReactNode
}

export interface XnsNameCaptureProps extends XnsNameCaptureBaseProps,
  XnsNameCaptureTrackingProps,
  XnsNameCaptureBuyCallbacks,
  XnsNameCaptureRoutingProps,
  FlexBoxProps
{}

export type WithXnsCapture<T> = T & { XnsCapture?: React.FC<XnsNameCaptureProps> }
