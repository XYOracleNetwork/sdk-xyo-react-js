import { useUserEvents } from '@xylabs/react-pixel'

import type { XyoUserEvents } from '../XyoUserEvents.ts'

export const useXyoUserEvents = () => {
  return useUserEvents(true) as XyoUserEvents
}
