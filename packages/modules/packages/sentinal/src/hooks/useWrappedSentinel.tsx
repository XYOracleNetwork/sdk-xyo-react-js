import { WrappedModuleHookFactory } from '@xyo-network/react-module'
import { SentinelWrapper } from '@xyo-network/sentinel'

export const useWrappedSentinel = WrappedModuleHookFactory.create(SentinelWrapper)
