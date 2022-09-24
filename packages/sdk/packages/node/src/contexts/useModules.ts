import { useModuleAddresses } from './useModuleAddresses'
import { useNode } from './useNode'

export const useModules = () => {
  const [addresses] = useModuleAddresses()
  const [node] = useNode()
  return addresses?.map((address) => node?.resolve(address))
}
