import { useContextEx } from '@xylabs/react-shared'

import { SentinelContext } from './Context.ts'

export const useSentinelContext = () => {
  const {
    sentinel, history, progress, reportingErrors, status,
  } = useContextEx(SentinelContext, 'Sentinel')
  return {
    history, progress, reportingErrors, sentinel, status,
  }
}
