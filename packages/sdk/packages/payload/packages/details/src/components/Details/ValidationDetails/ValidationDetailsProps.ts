import type { Payload } from '@xyo-network/payload-model'
import type { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  value?: Payload
}
