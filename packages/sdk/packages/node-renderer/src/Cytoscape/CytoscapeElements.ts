import { exists } from '@xylabs/exists'
import { ModuleInstance } from '@xyo-network/module-model'
import { ElementDefinition } from 'cytoscape'

import { parseModuleType } from './lib'

interface ModuleInfo {
  children: ModuleInfo[]
  depth: number
  module: ModuleInstance
}

export const CytoscapeElements = {
  MaxNameLength: 20,

  buildEdge(rootNode: ElementDefinition, newNode: ElementDefinition) {
    return {
      data: {
        id: `${rootNode.data.id}/${newNode.data.id}`,
        source: rootNode.data.id,
        target: newNode.data.id,
      },
    }
  },

  async buildElements(module: ModuleInstance): Promise<ElementDefinition[]> {
    const info = await CytoscapeElements.recurseNodes(module)
    const newElements: ElementDefinition[] = await this.buildElementsFromInfo(info, undefined, ['activeNode'])

    return newElements
  },

  async buildElementsFromInfo(info: ModuleInfo, root?: ElementDefinition, classes: string[] = []): Promise<ElementDefinition[]> {
    const newNode = CytoscapeElements.buildNode(info.module, { childCount: info.children.length, depth: info.depth }, classes)
    const newEdge = root ? CytoscapeElements.buildEdge(root, newNode) : undefined
    const newElements: ElementDefinition[] = [newNode]
    if (newEdge) {
      newElements.push(newEdge)
    }

    for (const childInfo of info.children) {
      newElements.push(...(await this.buildElementsFromInfo(childInfo, newNode)))
    }

    return newElements
  },

  buildNode(module: ModuleInstance, properties?: { [key: string]: unknown }, classes?: string[]): ElementDefinition {
    const { address, id } = module
    return {
      classes,
      data: {
        address,
        id: address,
        name: id,
        type: parseModuleType(module),
        ...properties,
      },
    }
  },

  buildRootNode: (module: ModuleInstance): ElementDefinition => {
    return CytoscapeElements.buildNode(module, {}, ['activeNode'])
  },

  normalizeName(name?: string) {
    if (!name) return
    if (name.length > this.MaxNameLength) return `${name.slice(0, 20)}...`
    return name
  },

  async recurseNodes(root: ModuleInstance, maxDepth = 10, depth = 1): Promise<ModuleInfo> {
    const info: ModuleInfo = { children: [], depth, module: root }

    if (maxDepth > 0) {
      const children = await root.resolve('*', { direction: 'down', maxDepth: 1 })
      info.children = (
        await Promise.all(
          children.map(async (child) => {
            if (child.address !== root.address) {
              return await this.recurseNodes(child, maxDepth - 1, depth + 1)
              // don't re add the root module that was passed in
            }
          }),
        )
      ).filter(exists)
    }

    return info
  },
}
