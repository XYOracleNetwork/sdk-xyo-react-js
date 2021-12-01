import BaseEvent from './BaseEvent'
import Snaptr from './Snaptr'
import SnapchatStandardProperties from './StandardProperties'

class StandardEvent<T extends SnapchatStandardProperties> extends BaseEvent<T> {
  async send(data: T) {
    await Snaptr.track(this.name, data)
  }
}

export default StandardEvent
