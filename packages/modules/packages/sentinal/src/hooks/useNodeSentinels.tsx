import { WrappedNodeModulesHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useSentinels = WrappedNodeModulesHookFactory(SentinelWrapper, 'useSentinel')
