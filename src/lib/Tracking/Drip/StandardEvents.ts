import BaseEvent from './BaseEvent'
import { DripIdentifyData } from './Data'

class StandardEvents<T> {
  public identify() {
    return new BaseEvent<DripIdentifyData | T>('identify')
  }
}

export default StandardEvents
