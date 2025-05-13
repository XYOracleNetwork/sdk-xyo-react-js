import type { Address } from '@xylabs/hex'
import type { ContextExState } from '@xylabs/react-shared'
import type { MemoryNode } from '@xyo-network/node-memory'

export type StandardNodesState = ContextExState<{
  findAddressByName?: (name?: string) => Address | undefined
  nodes?: MemoryNode[]
}>
