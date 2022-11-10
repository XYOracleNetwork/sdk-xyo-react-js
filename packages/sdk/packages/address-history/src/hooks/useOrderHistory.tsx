import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { useCallback } from 'react'

// If a boundwitness hash is not found in any other previous_hashes in the history,
// it is not yet a parent and therefore the youngest
const findYoungestBW = (addressHistory: XyoBoundWitness[]) =>
  addressHistory?.find((bw) => {
    const bwHash = new PayloadWrapper(bw).hash
    const isChild = addressHistory.some((nestedBW) => nestedBW.previous_hashes.some((hash) => hash === bwHash))
    return !isChild
  })

// find the index in addressHistory of the parent by comparing possible parent hashes
// to the current child's previous_hashes[0]
const findParent = (hashes: string[], addressHistory: XyoBoundWitness[], currentChild?: XyoBoundWitness) => {
  const nextParentIndex = hashes?.findIndex((hash) => hash === currentChild?.previous_hashes[0])
  return addressHistory[nextParentIndex]
}

// Note: Assumes there are no orphaned record in the history.
export const useOrderedHistory = () => {
  const run = useCallback((addressHistory?: XyoBoundWitness[]) => {
    if (addressHistory?.length) {
      const stack: XyoBoundWitness[] = []
      const hashes = addressHistory?.map((bw) => new PayloadWrapper(bw).hash)
      const youngestBW = findYoungestBW(addressHistory)

      if (youngestBW) {
        // stack starts with you youngest bw and works back up from its previous_hashes[0]
        stack.unshift(youngestBW)
        let currentChild = youngestBW
        let noParent = false
        // once currentChild has a previous hash of null, there are no more parents
        while (!noParent) {
          // Note: Potential optimization to remove already placed items in the stack from address history
          // and pass the remaining items to findParent
          const parent = findParent(hashes, addressHistory, currentChild)
          if (!parent) {
            noParent = true
          } else {
            currentChild = parent
            stack.push(parent)
          }
        }

        return addressHistory?.length ? stack : undefined
      }
    }
    return []
  }, [])

  return run
}
