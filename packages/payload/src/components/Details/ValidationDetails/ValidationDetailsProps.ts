import { XyoPayload } from '@xyo-network/core'
import { PropertyGroupProps } from '@xyo-network/react-property'

export interface PayloadValidationDetailsProps extends PropertyGroupProps {
  skipBody?: boolean
  skipMeta?: boolean
  value?: XyoPayload
  viewSchemaUrl?: string
}
