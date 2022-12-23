/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { SchemaStatsApiDiviner } from '@xyo-network/api'
import { Dispatch } from 'react'

/** @deprecated - get stats from querying the module on the node directly */
export interface SchemaStatsApiDivinerState {
  diviner?: SchemaStatsApiDiviner
  setDiviner?: Dispatch<SchemaStatsApiDiviner>
}
