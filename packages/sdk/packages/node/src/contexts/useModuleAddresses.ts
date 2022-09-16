import { useNode } from './useNode'

export const useModuleAddresses = () => {
  const [node] = useNode()
  return [node?.attached(), node?.registered()]
}
