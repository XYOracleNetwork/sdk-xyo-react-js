import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export type ResolvedDivinerState<T> = ContextExState<{
  diviner?: T
  setDiviner?: Dispatch<SetStateAction<T | undefined>>
}>
