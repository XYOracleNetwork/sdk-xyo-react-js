import { useContextEx } from '@xyo-network/react-shared'

import { SentinelContext } from './Context'

export const useSentinel = () => {
  const { sentinel, history, progress, reportingErrors, status } = useContextEx(SentinelContext, 'XyoSentinel')
  return { history, progress, reportingErrors, sentinel, status }
}
