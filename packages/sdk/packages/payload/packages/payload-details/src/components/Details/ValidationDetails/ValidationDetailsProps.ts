import { XyoPayload } from '@xyo-network/payload'
import { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  value?: XyoPayload
  viewSchemaUrl?: string
}
