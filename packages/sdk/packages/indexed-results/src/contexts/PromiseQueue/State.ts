import type { ContextExState } from '@xylabs/react-shared'

import type { PromiseQueue } from '../../classes/index.ts'

export type PromiseQueueState = ContextExState<{
  queue?: PromiseQueue
}>
