import { useAsyncEffect } from '@xylabs/react-shared'
import { ModuleWrapper } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { useProvidedWrappedNode } from '@xyo-network/react-node'
import { CytoscapeOptions } from 'cytoscape'
import { useState } from 'react'

import { parseModuleType } from '../lib'

/**
 * Note: Relies on describe but could eventually be converted to a discover call
 * Logic would be similar to what the bridge does
 */
export const useCytoscapeElements = () => {
  const [node] = useProvidedWrappedNode()
  const [elements, setElements] = useState<CytoscapeOptions['elements']>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (node) {
        try {
          const newElements = []
          const wrapper = NodeWrapper.wrap(node)
          const description = await wrapper?.describe()
          const rootNodeId = description.name ?? description.address.substring(0, 6)
          newElements.push({
            data: { id: rootNodeId, type: parseModuleType(description.queries) },
          })
          const children = description.children
          await Promise.all(
            (children ?? [])?.map(async (address) => {
              const [result] = await wrapper.resolveWrapped(ModuleWrapper, { address: [address] })
              try {
                const description = await result.describe()
                const newNodeId = description.name ?? description.address.substring(0, 6)
                const newNode = {
                  data: {
                    id: newNodeId,
                    type: parseModuleType(description.queries),
                  },
                }
                newElements.push(newNode)
                const newEdge = {
                  data: {
                    id: `${rootNodeId}/${newNodeId}`,
                    source: rootNodeId,
                    target: newNodeId,
                  },
                }
                newElements.push(newEdge)
              } catch (e) {
                console.error(e, result)
              }
            }),
          )
          setElements(newElements)
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node],
  )

  return elements
}
