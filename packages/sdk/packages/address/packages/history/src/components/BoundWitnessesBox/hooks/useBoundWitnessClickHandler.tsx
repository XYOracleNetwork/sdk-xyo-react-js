import type { Hash } from '@xylabs/hex'
import { useMounted } from '@xylabs/react-shared'
import type { EventNoun } from '@xyo-network/react-event'
import { useCallback } from 'react'

import { useNestedBoundWitnesses, usePayloadHashSelectionHistory } from '../../../hooks/index.ts'
import type { BoundwitnessClickType } from '../lib/index.ts'

export const useBoundWitnessClickHandler = () => {
  const mounted = useMounted()
  const {
    hashSelectionHistory, fetchFromHash, addSelection, clearHistory,
  } = usePayloadHashSelectionHistory(false)
  const {
    setClickedExistingHash, setLoading,
  } = useNestedBoundWitnesses(false)
  const boundwitnessClick = useCallback(
    (noun: EventNoun, data?: Hash, clickType?: BoundwitnessClickType) => {
      // eslint-disable-next-line complexity
      void (async () => {
        if (noun === 'boundwitness' && data) {
          if (clickType === 'activeBoundWitness' && !hashSelectionHistory?.includes(data)) {
            clearHistory?.()
          }
          if (hashSelectionHistory?.includes(data)) {
            setClickedExistingHash?.(data)
          } else {
            setClickedExistingHash?.(undefined)
          }
          setLoading?.(true)
          try {
            const bw = await fetchFromHash?.(data)
            if (bw) {
              await addSelection?.(bw)
              if (mounted()) {
                setLoading?.(false)
              }
              return true
            }
          } catch (e) {
            setLoading?.(false)
            console.error(e)
          }
        }
      })()
    },
    [addSelection, clearHistory, fetchFromHash, hashSelectionHistory, mounted, setClickedExistingHash, setLoading],
  )

  return { boundwitnessClick }
}
