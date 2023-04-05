import { WrappedModulesHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useSentinels = WrappedModulesHookFactory(SentinelWrapper, 'useSentinel')
