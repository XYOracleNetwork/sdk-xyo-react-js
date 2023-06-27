import { Payload } from '@xyo-network/payload-model'
import { PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadValidationDetailsProps = PropertyGroupProps & {
  skipBody?: boolean
  value?: Payload
}
