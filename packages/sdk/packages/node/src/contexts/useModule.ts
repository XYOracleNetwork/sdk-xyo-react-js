import { useNode } from './useNode'

export interface ModuleIdentifier {
  address?: string
  schema?: string
}

export const useModule = ({ address, schema }: ModuleIdentifier) => {
  const [node] = useNode()
  if (address) {
    return node?.resolve([address]).shift()
  } else if (schema) {
    return node?.find([schema]).shift()
  } else {
    return undefined
  }
}
