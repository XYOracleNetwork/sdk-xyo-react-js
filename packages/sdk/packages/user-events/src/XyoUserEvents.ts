import type {
  FunnelStartedFields, TestStartedFields, UserClickFields, ViewContentFields,
} from '@xylabs/pixel'
import { UserEventHandler } from '@xylabs/pixel'
import type { EmptyObject } from '@xylabs/sdk-js'
import type { Mixpanel } from 'mixpanel-browser'

import { FacebookEventHandler } from './FacebookEventHandler.ts'
import { GoogleEventHandler } from './GoogleEventHandler.ts'
import { MixpanelEventHandler } from './MixpanelEventHandler.ts'
import type {
  XnsEstimateAttemptedFields, XnsEstimateFailureFields, XnsEstimateSuccessFields,
} from './XnsEstimateEventHandlerInterface.ts'
import type {
  XnsPurchaseAttemptedFields, XnsPurchaseFailureFields, XnsPurchaseSuccessFields,
} from './XnsPurchaseEventHandlerInterface.ts'
import type {
  XnsReservationAttemptedFields, XnsReservationFailureFields, XnsReservationSuccessFields,
} from './XnsReservationEventHandlerInterface.ts'
import { XyoEventHandler } from './XyoEventHandler.ts'
import type { XyoEventHandlerInterface, XyoNewsletterSignupFields } from './XyoEventHandlerInterface.ts'

export class XyoUserEvents<TData extends EmptyObject = EmptyObject> extends UserEventHandler<TData> {
  // eslint-disable-next-line sonarjs/public-static-readonly
  static instance: XyoUserEvents<EmptyObject>

  protected handlers: XyoEventHandlerInterface<TData>[]

  private constructor(handlers?: XyoEventHandlerInterface<TData>[]) {
    super()
    this.handlers = handlers ?? [new XyoEventHandler<TData>(), new FacebookEventHandler<TData>(), new GoogleEventHandler<TData>()]
  }

  static get<T extends EmptyObject = EmptyObject>(mixpanel?: Mixpanel) {
    this.instance = this.instance ?? (() => {
      const handlers = [new XyoEventHandler<T>(), new FacebookEventHandler<T>(), new GoogleEventHandler<T>()]
      if (mixpanel) handlers.push(new MixpanelEventHandler(mixpanel))
      return new XyoUserEvents<T>(handlers)
    })()
    return this.instance
  }

  funnelStarted<T extends TData>(_fields: T | FunnelStartedFields): Promise<void> {
    throw new Error('Method not implemented.')
  }

  testStarted<T extends TData>(_fields: T | TestStartedFields): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async userClick<T extends TData>(fields: T | UserClickFields) {
    await Promise.all(this.handlers.map(handler => handler.userClick<T>(fields)))
  }

  async viewContent<T extends TData>(fields: T | ViewContentFields) {
    await Promise.all(this.handlers.map(handler => handler.viewContent(fields)))
  }

  async xnsEstimateAttempted<T extends TData>(fields: T | XnsEstimateAttemptedFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsEstimateAttempted(fields)))
  }

  async xnsEstimateFailure<T extends TData>(fields: T | XnsEstimateFailureFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsEstimateFailure(fields)))
  }

  async xnsEstimateSuccess<T extends TData>(fields: T | XnsEstimateSuccessFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsEstimateSuccess(fields)))
  }

  async xnsPurchaseAttempted<T extends TData>(fields: T | XnsPurchaseAttemptedFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsPurchaseAttempted(fields)))
  }

  async xnsPurchaseFailure<T extends TData>(fields: T | XnsPurchaseFailureFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsPurchaseFailure(fields)))
  }

  async xnsPurchaseSuccess<T extends TData>(fields: T | XnsPurchaseSuccessFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsPurchaseSuccess(fields)))
  }

  async xnsReservationAttempted<T extends TData>(fields: T | XnsReservationAttemptedFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsReservationAttempted(fields)))
  }

  async xnsReservationFailure<T extends TData>(fields: T | XnsReservationFailureFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsReservationFailure(fields)))
  }

  async xnsReservationSuccess<T extends TData>(fields: T | XnsReservationSuccessFields) {
    await Promise.all(this.handlers.map(handler => handler.xnsReservationSuccess(fields)))
  }

  async xyoNewsletterSignup<T extends TData>(fields: T | XyoNewsletterSignupFields) {
    await Promise.all(this.handlers.map(handler => handler.xyoNewsletterSignup(fields)))
  }
}
