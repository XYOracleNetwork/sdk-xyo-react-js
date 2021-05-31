import UserClickData from '../UserClickData'
import UserEventHandler from '../UserEventHandler'
import ViewContentData from '../ViewContentData'
import CustomEvent from './CustomEvent'

class GoogleUserEventHandler<T> implements UserEventHandler<T> {
  public async testStarted(data: T) {
    const event = new CustomEvent<T>('TestStarted')
    return await event.send(data)
  }

  public async viewContent(data: ViewContentData | T) {
    const event = new CustomEvent<ViewContentData | T>('ViewContent')
    return await event.send(data)
  }

  public async userClick(data: UserClickData | T) {
    const event = new CustomEvent<UserClickData | T>('UserClick')
    return await event.send(data)
  }
}

export default GoogleUserEventHandler
