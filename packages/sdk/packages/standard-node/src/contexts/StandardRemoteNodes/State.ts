import type { ContextExState } from '@xylabs/react-shared'
import type { Address } from '@xylabs/sdk-js'
import type { MemoryNode } from '@xyo-network/node-memory'

export type StandardNodesState = ContextExState<{
  findAddressByName?: (name?: string) => Address | undefined
  nodes?: MemoryNode[]
}>
