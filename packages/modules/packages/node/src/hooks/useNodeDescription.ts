import { usePromise } from '@xylabs/react-promise'
import { ModuleDescription, ModuleDescriptionPayload, ModuleDescriptionSchema } from '@xyo-network/module-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useNode } from './useNode.ts'

export const useNodeDescription = (config?: ModuleFromNodeConfig | undefined): [ModuleDescription | undefined, Error | undefined] => {
  const [activeNode, nodeError] = useNode(config)
  const [description, error] = usePromise(async () => {
    const state = await activeNode?.state()
    return state?.find<ModuleDescriptionPayload>(isPayloadOfSchemaType(ModuleDescriptionSchema))
  }, [activeNode])
  return [description, nodeError ?? error]
}
