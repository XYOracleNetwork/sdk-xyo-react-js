import mixpanel from 'mixpanel-browser'

import { XyoUserEvents } from './XyoUserEvents.ts'

// we call this outside the function to force initialization on page load
let instance: XyoUserEvents

export const getXyoUserEvents = (mixpanelToken?: string) => {
  return instance = instance ?? XyoUserEvents.get(mixpanelToken ? mixpanel.init(mixpanelToken) : undefined)
}
