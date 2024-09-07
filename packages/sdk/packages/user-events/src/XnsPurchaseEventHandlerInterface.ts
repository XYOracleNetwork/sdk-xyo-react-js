import type { EmptyObject } from '@xylabs/object'
import type { UserEventHandler } from '@xylabs/pixel'

export interface XnsPurchaseFields extends EmptyObject {
  name: string
  price: number
}

export interface XnsPurchaseAttemptedFields extends XnsPurchaseFields {}

export interface XnsPurchaseSuccessFields extends XnsPurchaseFields {
  currency?: string
  /** Identifier for the purchase - rebilly or payload hash */
  id: string
  quantity?: number
  /** price - discount */
  value: number
}

export interface XnsPurchaseFailureFields extends XnsPurchaseFields {
  error: string
}

export interface XnsPurchaseEventHandlerInterface<TData extends EmptyObject> extends UserEventHandler<TData> {
  xnsPurchaseAttempted<T extends TData>(fields: T | XnsPurchaseAttemptedFields): Promise<void>

  xnsPurchaseFailure<T extends TData>(fields: T | XnsPurchaseFailureFields): Promise<void>

  xnsPurchaseSuccess<T extends TData>(fields: T | XnsPurchaseSuccessFields): Promise<void>
}
