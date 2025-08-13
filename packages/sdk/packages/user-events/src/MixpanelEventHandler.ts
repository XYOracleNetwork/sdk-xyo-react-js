import type { EmptyObject } from '@xylabs/object'
import type { Mixpanel } from 'mixpanel-browser'

import { MixpanelEvents } from './Mixpanel/index.ts'
import type { XnsPurchaseSuccessFields } from './XnsPurchaseEventHandlerInterface.ts'
import type { Events } from './XyoEventHandler.ts'
import { XyoEventHandler } from './XyoEventHandler.ts'
import type { XyoEventHandlerInterface } from './XyoEventHandlerInterface.ts'

export class MixpanelEventHandler<T extends EmptyObject> extends XyoEventHandler<T> implements XyoEventHandlerInterface<T> {
  protected mixpanel: Mixpanel
  protected mixpanelEvents: MixpanelEvents

  constructor(mixpanel: Mixpanel) {
    super()
    this.mixpanel = mixpanel
    this.mixpanelEvents = new MixpanelEvents(mixpanel)
  }

  override get events() {
    return this.mixpanelEvents as Events<T>
  }

  override async xnsPurchaseSuccess(fields: XnsPurchaseSuccessFields) {
    return await Promise.resolve(this.mixpanel.track('Purchase', fields))
  }
}
