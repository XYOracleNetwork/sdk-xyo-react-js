import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper } from '@xyo-network/payload'
import { useCallback } from 'react'

export const useOrderHistory = () => {
  const run = useCallback((addressHistory?: XyoBoundWitness[]) => {
    const stack: (XyoBoundWitness | undefined)[] = [undefined, undefined]
    const hashes = addressHistory?.map((bw) => new PayloadWrapper(bw).hash)
    addressHistory?.forEach((bw, index) => {
      const hash = hashes?.[index]
      const child = addressHistory.find((bw) => bw.previous_hashes[0] === hash)

      if (bw.previous_hashes[0] === null) {
        stack[stack.length - 1] = bw
        return
      }

      if (!child) {
        stack[0] = bw
        return
      }

      const childInStackIndex = stack.findIndex((bwInStack) => bwInStack === child)
      if (child) {
        if (childInStackIndex !== -1) {
          stack.splice(childInStackIndex + 1, 0, bw)
        } else {
          stack.splice(1, 0, bw)
        }
      }
    })

    return addressHistory?.length ? stack : undefined
  }, [])

  return run
}
