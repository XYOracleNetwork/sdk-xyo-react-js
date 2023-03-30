import { useAsyncEffect } from '@xylabs/react-shared'
import { EventUnsubscribeFunction, ModuleDescription, ModuleWrapper } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { useProvidedWrappedNode } from '@xyo-network/react-node'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { parseModuleType } from '../lib'

const MaxNameLength = 20

const normalizeName = (name?: string) => {
  if (!name) return
  if (name.length > MaxNameLength) return `${name.substring(0, 20)}...`
  return name
}

const buildNode = (description: ModuleDescription): ElementDefinition => {
  const newNodeId = normalizeName(description.name) ?? description.address.substring(0, 8)
  return {
    data: {
      id: newNodeId,
      type: parseModuleType(description.queries),
    },
  }
}

const buildEdge = (rootNode: ElementDefinition, newNode: ElementDefinition) => ({
  data: {
    id: `${rootNode.data.id}/${newNode.data.id}`,
    source: rootNode.data.id,
    target: newNode.data.id,
  },
})

const buildRootNode = async (wrapper: NodeWrapper): Promise<[ModuleDescription, ElementDefinition]> => {
  const description = await wrapper?.describe()
  return [description, buildNode(description)]
}

const buildChild = async (wrapper: NodeWrapper, address: string) => {
  const [result] = await wrapper.resolveWrapped(ModuleWrapper, { address: [address] })
  const description = await result.describe()
  return buildNode(description)
}

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
          const [description, newRootNode] = await buildRootNode(node)
          if (mounted()) setElements(() => [newRootNode])

          const children = description.children
          await Promise.allSettled(
            (children ?? [])?.map(async (address) => {
              try {
                const newNode = await buildChild(node, address)
                if (mounted()) setElements((previous) => [...previous, newNode])

                const newEdge = buildEdge(newRootNode, newNode)
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
