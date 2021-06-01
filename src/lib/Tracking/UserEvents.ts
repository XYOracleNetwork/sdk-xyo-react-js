import FunnelStartedData from './FunnelStartedData'
import UserClickData from './UserClickData'
import UserEventHandler from './UserEventHandler'
import ViewContentData from './ViewContentData'

class UserEvents<T> extends UserEventHandler<T> {
  protected handlers: UserEventHandler<T>[]
  private constructor(handlers: UserEventHandler<T>[] = []) {
    super()
    this.handlers = handlers
  }

  async testStarted(data: T) {
    await Promise.all(this.handlers.map((handler) => handler.testStarted(data)))
  }

  async funnelStarted(data: T | FunnelStartedData) {
    await Promise.all(this.handlers.map((handler) => handler.funnelStarted(data)))
  }

  async viewContent(data: T | ViewContentData) {
    await Promise.all(this.handlers.map((handler) => handler.viewContent(data)))
  }

  async userClick(data: T | UserClickData) {
    await Promise.all(this.handlers.map((handler) => handler.userClick(data)))
  }
}

export default UserEvents
