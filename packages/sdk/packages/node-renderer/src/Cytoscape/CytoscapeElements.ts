import { exists, isFalsy } from '@xylabs/sdk-js'
import type { ModuleInstance } from '@xyo-network/module-model'
import type { ElementDefinition } from 'cytoscape'

import { parseModuleType } from './lib/index.ts'

interface ModuleInfo {
  children: ModuleInfo[]
  depth: number
  mod: ModuleInstance
}

export const CytoscapeElements = {
  MaxNameLength: 20,

  buildEdge(rootNode: ElementDefinition, newNode: ElementDefinition, properties?: { [key: string]: unknown }) {
    return {
      data: {
        id: `${rootNode.data.id}/${newNode.data.id}`,
        source: rootNode.data.id,
        target: newNode.data.id,
        ...properties,
      },
    }
  },

  async buildElements(mod: ModuleInstance): Promise<ElementDefinition[]> {
    const info = await CytoscapeElements.recurseNodes(mod)
    const newElements: ElementDefinition[] = await this.buildElementsFromInfo(info, undefined, ['activeNode'])

    return newElements
  },

  async buildElementsFromInfo(info: ModuleInfo, root?: ElementDefinition, classes: string[] = []): Promise<ElementDefinition[]> {
    const newNode = CytoscapeElements.buildNode(info.mod, { childCount: info.children.length, depth: info.depth }, classes)
    const newEdge = root
      ? CytoscapeElements.buildEdge(root, newNode, { depth: info.depth, siblingCount: info.children.length })
      : undefined
    const newElements: ElementDefinition[] = [newNode]
    if (newEdge) {
      newElements.push(newEdge)
    }

    for (const childInfo of info.children) {
      newElements.push(...(await this.buildElementsFromInfo(childInfo, newNode)))
    }

    return newElements
  },

  buildNode(mod: ModuleInstance, properties?: { [key: string]: unknown }, classes?: string[]): ElementDefinition {
    const { address, id } = mod
    return {
      classes,
      data: {
        address,
        id: address,
        name: id,
        type: parseModuleType(mod),
        ...properties,
      },
    }
  },

  buildRootNode: (mod: ModuleInstance): ElementDefinition => {
    return CytoscapeElements.buildNode(mod, {}, ['activeNode'])
  },

  normalizeName(name?: string) {
    if (isFalsy(name)) return
    if (name.length > this.MaxNameLength) return `${name.slice(0, 20)}...`
    return name
  },

  async recurseNodes(root: ModuleInstance, maxDepth = 10, depth = 1): Promise<ModuleInfo> {
    const info: ModuleInfo = {
      children: [], depth, mod: root,
    }

    if (maxDepth > 0) {
      const children = await root.resolve('*', { direction: 'down', maxDepth: 1 })
      info.children = (
        await Promise.all(
          children.map(async (child) => {
            // don't re add the root module that was passed in
            if (child.address !== root.address) {
              return await this.recurseNodes(child, maxDepth - 1, depth + 1)
            }
          }),
        )
      ).filter(exists)
    }

    return info
  },
}
