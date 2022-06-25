import { XyoPayloadWithPartialMeta } from '@xyo-network/core'
import { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  skipMeta?: boolean
  value?: XyoPayloadWithPartialMeta
  viewSchemaUrl?: string
}
