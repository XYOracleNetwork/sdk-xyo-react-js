import { useAsyncEffect } from '@xylabs/react-shared'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { ElementDefinition } from 'cytoscape'
import { useCallback, useEffect, useState } from 'react'

import { CytoscapeElements } from '../../Cytoscape'

/**
 * Note: Relies on describe but could eventually be converted to a discover call
 * Logic would be similar to what the bridge does
 */
export const useCytoscapeElements = (targetNode?: NodeWrapper) => {
  const [elements, setElements] = useState<ElementDefinition[]>([])

  const buildElements = useCallback(async (wrapper: NodeWrapper) => {
    try {
      const [description, newRootNode] = await CytoscapeElements.buildRootNode(wrapper)
      const newElements = [newRootNode]

      const children = description.children
      await Promise.allSettled(
        (children ?? [])?.map(async (address) => {
          try {
            const newNode = await CytoscapeElements.buildChild(wrapper, address)
            newElements.push(newNode)

            const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
            newElements.push(newEdge)
          } catch (e) {
            console.error('Error parsing children', e)
          }
        }),
      )
      setElements(newElements)
    } catch (e) {
      console.error('Error Getting initial description', e)
    }
  }, [])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (targetNode) {
        await buildElements(targetNode)
      }
    },
    [buildElements, targetNode],
  )

  useEffect(() => {
    let attachedListener: EventUnsubscribeFunction | undefined = undefined
    let detachedListener: EventUnsubscribeFunction | undefined = undefined

    if (targetNode) {
      attachedListener = targetNode.on('moduleAttached', async () => {
        await buildElements(targetNode)
      })
      detachedListener = targetNode.on('moduleDetached', async () => {
        await buildElements(targetNode)
      })
    }

    return () => {
      attachedListener?.()
      detachedListener?.()
    }
  }, [buildElements, targetNode])

  return elements
}
