import { useNode } from './useNode'

export const useModule = (address?: string) => {
  const [node] = useNode()
  return address ? node?.resolve(address) : undefined
}
