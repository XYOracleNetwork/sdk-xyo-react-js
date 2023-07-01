import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useSentinels = WrappedModulesFromNodeHookFactory.create(SentinelWrapper, 'useSentinel')
