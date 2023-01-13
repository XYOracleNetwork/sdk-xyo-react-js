import { Huri } from '@xyo-network/huri'

export const useHuriOrHash = (huriOrHash?: string | Huri) => {
  if (huriOrHash) {
    if (typeof huriOrHash === 'string') {
      return huriOrHash
    }
    if (huriOrHash instanceof Huri) {
      return huriOrHash.hash
    }
  }
}
