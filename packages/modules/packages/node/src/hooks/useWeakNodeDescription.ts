import { usePromise } from '@xylabs/react-promise'
import type { ModuleDescription, ModuleDescriptionPayload } from '@xyo-network/module-model'
import { ModuleDescriptionSchema } from '@xyo-network/module-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'

import { useWeakNode } from './useWeakNode.ts'
import type { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

export const useWeakNodeDescription = (config?: WeakModuleFromNodeConfig | undefined): [ModuleDescription | undefined, Error | undefined] => {
  const [activeNode, nodeError] = useWeakNode(config)
  const [description, error] = usePromise(async () => {
    const state = await activeNode?.deref()?.state()
    return state?.find<ModuleDescriptionPayload>(isPayloadOfSchemaType(ModuleDescriptionSchema))
  }, [activeNode])
  return [description, nodeError ?? error]
}
