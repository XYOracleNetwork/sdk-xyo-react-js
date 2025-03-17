import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { WithStorageMeta } from '@xyo-network/payload-model'

// If a boundwitness hash is not found in any other previous_hashes in the history,
// it is not yet a parent and therefore the head
const getHead = async (addressHistory: BoundWitness[]): Promise<BoundWitness | undefined> => {
  const addressHistoryPairs = await PayloadBuilder.dataHashPairs(addressHistory)
  return addressHistoryPairs?.find(([_, bwHash]) => {
    const isChild = addressHistory.some(nestedBW => nestedBW.previous_hashes.includes(bwHash))
    return !isChild
  })?.[0]
}

// find the index in addressHistory of the parent by comparing possible parent hashes
// to the current child's previous_hashes[0]
const findParent = (hashes: string[], addressHistory: BoundWitness[], currentChild?: BoundWitness) => {
  const nextParentIndex = hashes?.findIndex(hash => hash === currentChild?.previous_hashes[0])
  return addressHistory[nextParentIndex]
}

// Note: Assumes there are no orphaned record in the history.
export const orderedHistory = async (addressHistory?: BoundWitness[], order: 'asc' | 'desc' = 'asc'): Promise<WithStorageMeta<BoundWitness>[] | undefined> => {
  if (addressHistory?.length) {
    const stack: BoundWitness[] = []
    const youngestBW = await getHead(addressHistory)
    const hashes = await PayloadBuilder.dataHashes(addressHistory)
    if (youngestBW && hashes) {
      // stack starts with you youngest bw and works back up from its previous_hashes[0]
      stack.unshift(youngestBW)
      let currentChild = youngestBW
      let noParent = false
      // once currentChild has a previous hash of null, there are no more parents
      while (!noParent) {
        // Note: Potential optimization to remove already placed items in the stack from address history
        // and pass the remaining items to findParent
        const parent = findParent(hashes, addressHistory, currentChild)
        if (parent) {
          currentChild = parent
          stack.push(parent)
        } else {
          noParent = true
        }
      }

      const orderedStack = order === 'desc' ? stack.toReversed() : stack

      return addressHistory?.length ? PayloadBuilder.addStorageMeta(orderedStack) : undefined
    }
  }
  return []
}
