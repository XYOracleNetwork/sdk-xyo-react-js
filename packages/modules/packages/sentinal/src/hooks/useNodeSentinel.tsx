import { WrappedNodeModuleHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useNodeSentinel = WrappedNodeModuleHookFactory(SentinelWrapper, 'useNodeSentinel')
