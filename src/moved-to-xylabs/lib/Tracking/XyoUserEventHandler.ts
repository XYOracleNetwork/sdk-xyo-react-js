/* eslint-disable @delagen/deprecation/deprecation */
import {
  FunnelStartedFields,
  TestStartedFields,
  UserClickFields,
  UserEventHandler,
  ViewContentFields,
} from '@xylabs/pixel'

/** @deprecated Moved to @xylabs/sdk-react */
class XyoUserEventHandler<T> extends UserEventHandler<T> {
  protected handlers: UserEventHandler<T>[]
  private constructor(handlers: UserEventHandler<T>[] = []) {
    super()
    this.handlers = handlers
  }

  async testStarted(data: T | TestStartedFields) {
    await Promise.allSettled(this.handlers.map((handler) => handler.testStarted(data)))
  }

  async funnelStarted(data: T | FunnelStartedFields) {
    await Promise.allSettled(this.handlers.map((handler) => handler.funnelStarted(data)))
  }

  async viewContent(data: T | ViewContentFields) {
    await Promise.allSettled(this.handlers.map((handler) => handler.viewContent(data)))
  }

  async userClick(data: T | UserClickFields) {
    await Promise.allSettled(this.handlers.map((handler) => handler.userClick(data)))
  }
}

export default XyoUserEventHandler
