import { AccountInstance } from '@xyo-network/account-model'
import { ModuleManifest } from '@xyo-network/manifest-model'
import { isDirectModule, ModuleWrapper } from '@xyo-network/module'
import { NodeInstance } from '@xyo-network/node'
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

  static async buildElements(node: NodeInstance, account: AccountInstance) {
    try {
      const [, newRootNode] = await CytoscapeElements.buildRootNode(node)
      const newElements: ElementDefinition[] = [newRootNode]

      const children = await Promise.all(
        (
          await node.downResolver.resolve()
        ).map<Promise<[ModuleManifest, string]>>(async (child) => [
          await (isDirectModule(child) ? child.manifest() : ModuleWrapper.wrap(child, account).manifest()),
          child.address,
        ]),
      )
      await Promise.allSettled(
        (children ?? [])?.map(async ([child, address]) => {
          try {
            const newNode = await CytoscapeElements.buildNode(child, address)
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
