import { ModuleManifest } from '@xyo-network/manifest-model'
import { NodeInstance, isNodeInstance } from '@xyo-network/node-model'
import { ElementDefinition } from 'cytoscape'

import { parseModuleType } from './lib'

export class CytoscapeElements {
  static MaxNameLength = 20

  static buildEdge(rootNode: ElementDefinition, newNode: ElementDefinition) {
    return {
      data: {
        id: `${rootNode.data.id}/${newNode.data.id}`,
        source: rootNode.data.id,
        target: newNode.data.id,
      },
    }
  }

  static async buildElements(node: NodeInstance) {
    try {
      const [, newRootNode] = await CytoscapeElements.buildRootNode(node)
      const newElements: ElementDefinition[] = [newRootNode]

      const children = await CytoscapeElements.recurseNodes(node)

      await Promise.allSettled(
        (children ?? [])?.map(async ([child, address]) => {
          try {
            const newNode = CytoscapeElements.buildNode(child, address)
            newElements.push(newNode)

            const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
            newElements.push(newEdge)
          } catch (e) {
            console.error('Error parsing children', e)
          }
        }),
      )
      return newElements
    } catch (e) {
      console.error('Error Getting initial description', e)
    }
  }

  static async recurseNodes(node: NodeInstance, maxTraversals = 1): Promise<[ModuleManifest, string][]> {
    let localDepth = 0
    const childManifests: [ModuleManifest, string][] = []

    const traverse = async (nestedNode: NodeInstance) => {
      if (localDepth < maxTraversals) {
        const modules = await nestedNode.resolve(undefined, { maxDepth: 2, direction: 'down' })
        await Promise.all(modules.map(async (child) => {
          // if (child.config.schema.includes('bridge')) {
          //   console.log(await child.resolve())
          // }
          if (child !== nestedNode && isNodeInstance(child)) {
            localDepth++
            await traverse(child)
            // don't add the root node that was passed in
          } else if (child !== node) {
            childManifests.push([await child.manifest(), child.address])
          }
        }))
      }
    }
    await traverse(node)
    return childManifests
  }

  static buildNode(manifest: ModuleManifest, address: string): ElementDefinition {
    const newNodeId = CytoscapeElements.normalizeName(manifest.config.name) ?? address.substring(0, 8)
    return {
      data: {
        address,
        id: newNodeId,
        type: parseModuleType(manifest.config.schema),
      },
    }
  }

  static buildRootNode = async (node: NodeInstance): Promise<[ModuleManifest, ElementDefinition]> => {
    const manifest = await node?.manifest()
    return [manifest, CytoscapeElements.buildNode(manifest, node.address)]
  }

  static normalizeName(name?: string) {
    if (!name) return
    if (name.length > this.MaxNameLength) return `${name.substring(0, 20)}...`
    return name
  }
}
