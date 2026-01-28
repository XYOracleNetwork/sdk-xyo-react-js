import type {
  FunnelStartedFields, PurchaseFields, TestStartedFields, UserClickFields, ViewContentFields,
} from '@xylabs/pixel'
import { UserEventHandler } from '@xylabs/pixel'
import type { EmptyObject, Promisable } from '@xylabs/sdk-js'

import type {
  XnsEstimateAttemptedFields, XnsEstimateFailureFields, XnsEstimateSuccessFields,
} from './XnsEstimateEventHandlerInterface.ts'
import type {
  XnsPurchaseAttemptedFields, XnsPurchaseFailureFields, XnsPurchaseSuccessFields,
} from './XnsPurchaseEventHandlerInterface.js'
import type {
  XnsReservationAttemptedFields, XnsReservationFailureFields, XnsReservationSuccessFields,
} from './XnsReservationEventHandlerInterface.ts'
import { XyEvents } from './Xy/index.ts'
import type { XyoEventHandlerInterface, XyoNewsletterSignupFields } from './XyoEventHandlerInterface.ts'

export interface Event<TData extends EmptyObject = EmptyObject> {
  send<T extends TData>(fields: T, eventId?: string): Promisable<void>
}

export interface Events<TData extends EmptyObject = EmptyObject> {
  custom<T extends TData>(name: string): Event<T>
  purchase<T extends TData>(): Event<PurchaseFields | T>
  userClick<T extends TData>(): Event<UserClickFields | T>
  viewContent<T extends TData>(): Event<ViewContentFields | T>
}

export class XyoEventHandler<T extends EmptyObject> extends UserEventHandler<T> implements XyoEventHandlerInterface<T> {
  private _events = new XyEvents()

  get events(): Events<T> {
    return this._events
  }

  funnelStarted(_fields: T | FunnelStartedFields): Promise<void> {
    throw new Error('Method not implemented.')
  }

  testStarted(_fields: T | TestStartedFields): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async userClick(fields: UserClickFields) {
    await this.events.userClick().send(fields)
  }

  async viewContent(fields: ViewContentFields) {
    await this.events.viewContent().send(fields)
  }

  async xnsEstimateAttempted(fields: XnsEstimateAttemptedFields | T) {
    await this.events.custom('XnsEstimateAttempted').send(fields as T)
  }

  async xnsEstimateFailure(fields: XnsEstimateFailureFields | T) {
    await this.events.custom('XnsEstimateFailure').send(fields as T)
  }

  async xnsEstimateSuccess(fields: XnsEstimateSuccessFields | T) {
    await this.events.custom('XnsEstimateSuccess').send(fields as T)
  }

  async xnsPurchaseAttempted(fields: XnsPurchaseAttemptedFields | T) {
    await this.events.custom('XnsPurchaseAttempted').send(fields as T)
  }

  async xnsPurchaseFailure(fields: XnsPurchaseFailureFields | T) {
    await this.events.custom('XnsPurchaseFailure').send(fields as T)
  }

  async xnsPurchaseSuccess(fields: XnsPurchaseSuccessFields) {
    await this.events.purchase().send(fields)
  }

  async xnsReservationAttempted(fields: XnsReservationAttemptedFields | T) {
    await this.events.custom('XnsReservationAttempted').send(fields as T)
  }

  async xnsReservationFailure(fields: XnsReservationFailureFields | T) {
    await this.events.custom('XnsReservationFailure').send(fields as T)
  }

  async xnsReservationSuccess(fields: XnsReservationSuccessFields | T) {
    await this.events.custom('XnsReservationSuccess').send(fields as T)
  }

  async xyoNewsletterSignup(fields: XyoNewsletterSignupFields | T) {
    await this.events.custom('XyoNewsletterSignup').send(fields as T)
  }
}
