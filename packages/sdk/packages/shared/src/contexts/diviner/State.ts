import { Dispatch, SetStateAction } from 'react'

import { ContextExState } from '../contextEx/index.ts'

export interface ResolvedDivinerState<T> extends ContextExState {
  diviner?: T
  setDiviner?: Dispatch<SetStateAction<T | undefined>>
}
