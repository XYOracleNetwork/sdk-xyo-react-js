import { ModuleInstance } from '@xyo-network/module-model'
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

  static async buildElements(module: ModuleInstance): Promise<ElementDefinition[]> {
    const newRootNode = CytoscapeElements.buildRootNode(module)
    const newElements: ElementDefinition[] = [newRootNode]

    try {
      const childElements = await CytoscapeElements.recurseNodes(module)
      childElements?.forEach((module) => {
        const newNode = CytoscapeElements.buildNode(module)
        newElements.push(newNode)

        const newEdge = CytoscapeElements.buildEdge(newRootNode, newNode)
        newElements.push(newEdge)
      })

      return newElements
    } catch (e) {
      console.error('error resolving modules', e)
      return []
    }
  }

  static buildNode(module: ModuleInstance, properties?: { [key: string]: unknown }, classes?: string[]): ElementDefinition {
    const { address, config } = module
    const normalizedName = config.name ?? address.substring(0, 8)
    return {
      classes,
      data: {
        address,
        id: address,
        name: normalizedName,
        type: parseModuleType(module),
        ...properties,
      },
    }
  }

  static buildRootNode = (module: ModuleInstance): ElementDefinition => {
    return CytoscapeElements.buildNode(module, {}, ['activeNode'])
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
