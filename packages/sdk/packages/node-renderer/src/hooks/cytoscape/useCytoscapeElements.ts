import { useAsyncEffect } from '@xylabs/react-async-effect'
import { AccountInstance } from '@xyo-network/account-model'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeElements } from '../../Cytoscape'

/**
 * Note: Relies on describe but could eventually be converted to a discover call
 * Logic would be similar to what the bridge does
 */
export const useCytoscapeElements = (targetNode: NodeModule | undefined | null, account?: AccountInstance | undefined | null) => {
  const [elements, setElements] = useState<ElementDefinition[]>([])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (targetNode && account) {
        const newElements = (await CytoscapeElements.buildElements(targetNode, account)) ?? []
        setElements(newElements)
      }
    },
    [targetNode],
  )

  useEffect(() => {
    let attachedListener: EventUnsubscribeFunction | undefined = undefined
    let detachedListener: EventUnsubscribeFunction | undefined = undefined

    if (targetNode && account) {
      attachedListener = targetNode.on('moduleAttached', async () => {
        const newElements = (await CytoscapeElements.buildElements(targetNode, account)) ?? []
        setElements(newElements)
      })
      detachedListener = targetNode.on('moduleDetached', async () => {
        const newElements = (await CytoscapeElements.buildElements(targetNode, account)) ?? []
        setElements(newElements)
      })
    }

    return () => {
      attachedListener?.()
      detachedListener?.()
    }
  }, [targetNode])

  return elements
}
