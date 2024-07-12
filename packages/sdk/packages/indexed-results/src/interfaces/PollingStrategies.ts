import { PollingConfig } from './PollingConfig.js'

export type PollingStrategyNames = 'Continuous' | 'None' | 'TillComplete'

const continuousPolling = {
  initialDelay: 500,
  maxRetries: null,
}

export const PollingStrategies: Record<Partial<PollingStrategyNames>, PollingConfig> = {
  Continuous: {
    ...continuousPolling,
  },
  None: {
    maxRetries: 1,
  },
  TillComplete: {
    ...continuousPolling,
    onFoundResult: () => {
      console.warn('Polling strategy set to TillComplete but missing onFoundResult callback')
      return false
    },
  },
}
