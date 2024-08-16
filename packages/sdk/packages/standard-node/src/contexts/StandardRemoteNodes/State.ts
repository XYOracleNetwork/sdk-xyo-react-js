import type { Address } from '@xylabs/hex'
import type { MemoryNode } from '@xyo-network/node-memory'
import type { ContextExState } from '@xyo-network/react-shared'

export interface StandardNodesState extends ContextExState {
  findAddressByName?: (name?: string) => Address | undefined
  nodes?: MemoryNode[]
}
