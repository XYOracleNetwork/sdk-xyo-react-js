import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch } from 'react'

export interface SchemaContextState extends ContextExState {
  /** @field The currently selected XYO Schema */
  schema?: string
  /** @field The list of known available schema */
  schemaList?: string[]
  /** @field Function to set the selected Schema */
  setSchema?: Dispatch<string>
  /** @field Function to set the list of known available schema */
  setSchemaList?: Dispatch<string[]>
}
