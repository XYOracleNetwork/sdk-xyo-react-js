import { ModuleInstance } from '@xyo-network/module'
import { isNodeInstance } from '@xyo-network/node-model'
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

  static async buildElements(module: ModuleInstance) {
    try {
      const newRootNode = await CytoscapeElements.buildRootNode(module)
      const newElements: ElementDefinition[] = [newRootNode]

      const children = await CytoscapeElements.recurseNodes(module)

      children?.map((module) => {
        try {
          const newNode = CytoscapeElements.buildNode(module, newRootNode.data.id)
          newElements.push(newNode)

          const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
          newElements.push(newEdge)
        } catch (e) {
          console.error('Error parsing children', e)
        }
      })

      return newElements
    } catch (e) {
      console.error('Error Getting initial description', e)
    }
  }

  static buildNode(module: ModuleInstance, rootNodeId?: string): ElementDefinition {
    const { address } = module
    const newNodeId = CytoscapeElements.normalizeName(module.config.name) ?? address.substring(0, 8)
    return {
      data: {
        address,
        id: newNodeId,
        rootNodeId,
        type: parseModuleType(module),
      },
    }
  }

  static buildRootNode = (module: ModuleInstance): ElementDefinition => {
    return CytoscapeElements.buildNode(module)
  }

  static normalizeName(name?: string) {
    if (!name) return
    if (name.length > this.MaxNameLength) return `${name.substring(0, 20)}...`
    return name
  }

  static async recurseNodes(module: ModuleInstance, maxTraversals = 1): Promise<ModuleInstance[]> {
    let localDepth = 0
    const childModules: ModuleInstance[] = []

    const traverse = async (nestedNode: ModuleInstance) => {
      if (localDepth < maxTraversals) {
        const modules = await nestedNode.resolve(undefined, { direction: 'down', maxDepth: 2 })
        await Promise.all(
          modules.map(async (child) => {
            if (child !== nestedNode && isNodeInstance(child)) {
              localDepth++
              await traverse(child)
              // don't re add the root module that was passed in
            } else if (child !== module) {
              childModules.push(child)
            }
          }),
        )
      }
    }

    await traverse(module)

    return childModules
  }
}
