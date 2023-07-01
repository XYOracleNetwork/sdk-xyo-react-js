import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useNodeSentinel = WrappedModuleFromNodeHookFactory.create(SentinelWrapper, 'useNodeSentinel')
