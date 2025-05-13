import type { ContextExState } from '@xylabs/react-shared'
import type { NodeInstance } from '@xyo-network/node-model'
export type NodeContextState = ContextExState<{
  node?: NodeInstance | null
}>
