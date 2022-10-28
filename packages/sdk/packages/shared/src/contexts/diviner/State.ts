import { Dispatch, SetStateAction } from 'react'

import { ContextExState } from '../contextEx'

export interface ResolvedDivinerState<T> extends ContextExState {
  diviner?: T
  setDiviner?: Dispatch<SetStateAction<T | undefined>>
}
