import type {
  FunnelStartedFields, TestStartedFields, UserClickFields, UserEventHandler, ViewContentFields,
} from '@xylabs/pixel'
import type { EmptyObject, Promisable } from '@xylabs/sdk-js'

import type { XnsEstimateEventHandlerInterface } from './XnsEstimateEventHandlerInterface.ts'
import type { XnsPurchaseEventHandlerInterface } from './XnsPurchaseEventHandlerInterface.ts'
import type { XnsReservationEventHandlerInterface } from './XnsReservationEventHandlerInterface.ts'

export interface XyoNewsletterSignupFields extends Record<string, unknown> {
  email: string
  url: string
}

export interface XyoEventHandlerInterface<TData extends EmptyObject>
  extends UserEventHandler<TData>,
  XnsEstimateEventHandlerInterface<TData>,
  XnsReservationEventHandlerInterface<TData>,
  XnsPurchaseEventHandlerInterface<TData> {
  funnelStarted<T extends TData>(_fields: T | FunnelStartedFields): Promisable<void>

  testStarted<T extends TData>(_fields: T | TestStartedFields): Promisable<void>

  userClick<T extends TData>(fields: T | UserClickFields): Promisable<void>

  viewContent<T extends TData>(fields: T | ViewContentFields): Promisable<void>

  xyoNewsletterSignup<T extends TData>(fields: T | XyoNewsletterSignupFields): Promisable<void>
}
