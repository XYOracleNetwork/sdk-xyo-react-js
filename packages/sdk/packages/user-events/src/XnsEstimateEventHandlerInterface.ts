import type { EmptyObject } from '@xylabs/object'
import type { UserEventHandler } from '@xylabs/pixel'
import type { Promisable } from '@xylabs/promise'

export interface XnsEstimateFields extends EmptyObject {
  name: string
}

export interface XnsEstimateAttemptedFields extends XnsEstimateFields {}

export interface XnsEstimateSuccessFields extends XnsEstimateFields {
  price: number
}

export interface XnsEstimateFailureFields extends XnsEstimateFields {
  error: string
}

export interface XnsEstimateEventHandlerInterface<TData extends EmptyObject> extends UserEventHandler<TData> {
  xnsEstimateAttempted<T extends TData>(fields: XnsEstimateAttemptedFields | T): Promisable<void>

  xnsEstimateFailure<T extends TData>(fields: XnsEstimateFailureFields | T): Promisable<void>

  xnsEstimateSuccess<T extends TData>(fields: XnsEstimateSuccessFields | T): Promisable<void>
}
