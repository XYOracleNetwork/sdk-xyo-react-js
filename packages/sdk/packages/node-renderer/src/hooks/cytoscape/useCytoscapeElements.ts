import { useAsyncEffect } from '@xylabs/react-shared'
import { NodeWrapper } from '@xyo-network/node'
import { ElementDefinition } from 'cytoscape'
import { useState } from 'react'

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
        try {
          const [description, newRootNode] = await CytoscapeElements.buildRootNode(targetNode)
          const newElements = [newRootNode]

          const children = description.children
          await Promise.allSettled(
            (children ?? [])?.map(async (address) => {
              try {
                const newNode = await CytoscapeElements.buildChild(targetNode, address)
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
      }
      return () => console.log('unmounted')
    },
    [targetNode],
  )

  return elements
}
