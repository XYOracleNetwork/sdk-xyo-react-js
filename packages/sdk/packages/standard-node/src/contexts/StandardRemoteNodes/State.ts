import { MemoryNode } from '@xyo-network/node-memory'
import { ContextExState } from '@xyo-network/react-shared'

export interface StandardNodesState extends ContextExState {
  findAddressByName?: (name?: string) => string | undefined
  nodes?: MemoryNode[]
}
