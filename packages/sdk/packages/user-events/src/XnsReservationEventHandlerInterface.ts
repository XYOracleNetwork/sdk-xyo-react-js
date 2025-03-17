import type { EmptyObject } from '@xylabs/object'
import type { UserEventHandler } from '@xylabs/pixel'
import type { Promisable } from '@xylabs/promise'

export interface XnsReservationFields extends EmptyObject {
  email_hash: string
  name: string
}

export interface XnsReservationAttemptedFields extends XnsReservationFields {}

export interface XnsReservationSuccessFields extends XnsReservationFields {}

export interface XnsReservationFailureFields extends XnsReservationFields {
  error: string
}

export interface XnsReservationEventHandlerInterface<TData extends EmptyObject> extends UserEventHandler<TData> {
  xnsReservationAttempted<T extends TData>(fields: T | XnsReservationAttemptedFields): Promisable<void>

  xnsReservationFailure<T extends TData>(fields: T | XnsReservationFailureFields): Promisable<void>

  xnsReservationSuccess<T extends TData>(fields: T | XnsReservationSuccessFields): Promisable<void>
}
