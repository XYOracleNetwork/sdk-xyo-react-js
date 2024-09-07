import type { EmptyObject } from '@xylabs/object'
import type { UserEventHandler } from '@xylabs/pixel'

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
  xnsEstimateAttempted<T extends TData>(fields: XnsEstimateAttemptedFields | T): Promise<void>

  xnsEstimateFailure<T extends TData>(fields: XnsEstimateFailureFields | T): Promise<void>

  xnsEstimateSuccess<T extends TData>(fields: XnsEstimateSuccessFields | T): Promise<void>
}
