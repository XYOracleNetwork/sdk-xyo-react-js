import { useAsyncEffect } from '@xylabs/react-shared'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { useProvidedWrappedNode } from '@xyo-network/react-node'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeElements } from '../../Cytoscape'

/**
 * Note: Relies on describe but could eventually be converted to a discover call
 * Logic would be similar to what the bridge does
 */
export const useCytoscapeElements = () => {
  const [node] = useProvidedWrappedNode()
  const [elements, setElements] = useState<ElementDefinition[]>([])
  const [refresh, setRefresh] = useState(1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node && refresh) {
        try {
          const [description, newRootNode] = await CytoscapeElements.buildRootNode(node)
          if (mounted()) setElements(() => [newRootNode])

          const children = description.children
          await Promise.allSettled(
            (children ?? [])?.map(async (address) => {
              try {
                const newNode = await CytoscapeElements.buildChild(node, address)
                if (mounted()) setElements((previous) => [...previous, newNode])

                const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
                if (mounted()) setElements((previous) => [...previous, newEdge])
              } catch (e) {
                console.error('Error parsing children', e)
              }
            }),
          )
        } catch (e) {
          console.error('Error Getting initial description', e)
        }
      }
    },
    [node, refresh],
  )

  useEffect(() => {
    let listener: EventUnsubscribeFunction
    if (node) {
      listener = node.onAny((eventName) => {
        if (eventName === 'moduleAttached') setRefresh((previous) => previous + 1)
      })
    }
    return () => listener?.()
  }, [node])

  return elements
}
