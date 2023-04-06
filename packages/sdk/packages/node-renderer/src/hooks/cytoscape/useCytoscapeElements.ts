import { useAsyncEffect } from '@xylabs/react-shared'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeElements } from '../../Cytoscape'

/**
 * Note: Relies on describe but could eventually be converted to a discover call
 * Logic would be similar to what the bridge does
 */
export const useCytoscapeElements = (targetNode?: NodeWrapper) => {
  const [elements, setElements] = useState<ElementDefinition[]>([])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (targetNode) {
        const newElements = (await CytoscapeElements.buildElements(targetNode)) ?? []
        setElements(newElements)
      }
    },
    [targetNode],
  )

  useEffect(() => {
    let attachedListener: EventUnsubscribeFunction | undefined = undefined
    let detachedListener: EventUnsubscribeFunction | undefined = undefined

    if (targetNode) {
      attachedListener = targetNode.on('moduleAttached', async () => {
        const newElements = (await CytoscapeElements.buildElements(targetNode)) ?? []
        setElements(newElements)
      })
      detachedListener = targetNode.on('moduleDetached', async () => {
        const newElements = (await CytoscapeElements.buildElements(targetNode)) ?? []
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
