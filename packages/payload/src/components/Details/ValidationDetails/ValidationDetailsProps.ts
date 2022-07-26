import { XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  value?: XyoPayloadWithPartialMeta
  viewSchemaUrl?: string
}
