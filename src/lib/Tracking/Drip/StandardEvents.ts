import BaseEvent from './BaseEvent'
import { DripIdentifyData } from './Data'

class StandardEvents<T extends Record<string, unknown>> {
  public identify() {
    return new BaseEvent<DripIdentifyData | T>('identify')
  }
}

export default StandardEvents
