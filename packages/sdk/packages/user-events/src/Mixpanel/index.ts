import type { EmptyObject } from '@xylabs/object'
import { MixpanelCustomEvent, MixpanelPageViewEvent } from '@xylabs/react-pixel'
import type { Mixpanel } from 'mixpanel-browser'

export class MixpanelEvents<TData extends EmptyObject = EmptyObject> {
  protected mixpanel: Mixpanel

  constructor(mixpanel: Mixpanel) {
    this.mixpanel = mixpanel
  }

  custom<T extends TData>(name: string) {
    return new MixpanelCustomEvent<T>(name, this.mixpanel)
  }

  pageView<T extends TData>() {
    return new MixpanelPageViewEvent<T>(this.mixpanel)
  }

  purchase<T extends TData>() {
    return new MixpanelCustomEvent<T>('Purchase', this.mixpanel)
  }

  userClick<T extends TData>() {
    return new MixpanelCustomEvent<T>('UserClick', this.mixpanel)
  }

  viewContent<T extends TData>() {
    return new MixpanelCustomEvent<T>('ViewContent', this.mixpanel)
  }
}
