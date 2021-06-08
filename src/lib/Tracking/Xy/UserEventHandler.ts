import { FunnelStartedFields, UserClickFields, UserEventHandler, ViewContentFields } from '@xylabs/pixel'

import CustomEvent from './CustomEvent'

class XyUserEventHandler<T> implements UserEventHandler<T> {
  public async testStarted(data: T) {
    const event = new CustomEvent<T>('TestStarted')
    return await event.send(data)
  }

  public async funnelStarted(data: FunnelStartedFields | T) {
    const event = new CustomEvent<FunnelStartedFields | T>('FunnelStarted')
    return await event.send(data)
  }

  public async viewContent(data: ViewContentFields | T) {
    const event = new CustomEvent<ViewContentFields | T>('ViewContent')
    return await event.send(data)
  }

  public async userClick(data: UserClickFields | T) {
    const event = new CustomEvent<UserClickFields | T>('UserClick')
    return await event.send(data)
  }
}

export default XyUserEventHandler
