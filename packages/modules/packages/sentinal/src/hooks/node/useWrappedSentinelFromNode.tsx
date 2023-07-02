import { WrappedModuleFromNodeHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useWrappedSentinelFromNode = WrappedModuleFromNodeHookFactory.create(SentinelWrapper, 'useWrappedSentinelFromNode')
