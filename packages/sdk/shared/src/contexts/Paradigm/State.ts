import { Dispatch } from 'react'

import { Paradigm } from '../../models'
import { ContextExState } from '../contextEx'

export interface ParadigmContextState extends ContextExState {
  paradigm?: Paradigm
  setParadigm?: Dispatch<Paradigm>
}
