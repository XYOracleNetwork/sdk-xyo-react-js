import type { Dispatch, SetStateAction } from 'react'

import type { ContextExState } from '../contextEx/index.ts'

export interface ResolvedDivinerState<T> extends ContextExState {
  diviner?: T
  setDiviner?: Dispatch<SetStateAction<T | undefined>>
}
