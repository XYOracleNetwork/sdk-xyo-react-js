import { WrappedModulesFromNodeHookFactory } from '@xyo-network/react-node'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useWrappedSentinelsFromNode = WrappedModulesFromNodeHookFactory.create(SentinelWrapper, 'useWrappedSentinelsFromNode')
