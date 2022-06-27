import { XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  skipMeta?: boolean
  value?: XyoPayloadWithPartialMeta
  viewSchemaUrl?: string
}
