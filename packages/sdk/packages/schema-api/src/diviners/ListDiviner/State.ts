/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { SchemaListApiDiviner } from '@xyo-network/api'
import { Dispatch } from 'react'

/** @deprecated - get stats from querying the module on the node directly */
export interface SchemaListApiDivinerState {
  diviner?: SchemaListApiDiviner
  setDiviner?: Dispatch<SchemaListApiDiviner>
}
