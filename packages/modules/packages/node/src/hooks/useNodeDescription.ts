import { usePromise } from '@xylabs/react-promise'
import { ModuleDescription } from '@xyo-network/module-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
import { useNode } from './useNode'

export const useNodeDescription = (config?: ModuleFromNodeConfig | undefined): [ModuleDescription | undefined, Error | undefined] => {
  const [activeNode, nodeError] = useNode(config)
  const [description, error] = usePromise(async () => {
    return await activeNode?.describe()
  }, [activeNode])
  return [description, nodeError ?? error]
}
