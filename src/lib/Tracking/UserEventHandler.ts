import FunnelStartedData from './FunnelStartedData'
import UserClickData from './UserClickData'
import ViewContentData from './ViewContentData'

abstract class UserEventHandler<T> {
  abstract testStarted(data: T): Promise<void>
  abstract funnelStarted(data: T | FunnelStartedData): Promise<void>
  abstract viewContent(data: T | ViewContentData): Promise<void>
  abstract userClick(data: T | UserClickData): Promise<void>
}

export default UserEventHandler
