import { FlexBoxProps } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

export interface PayloadValidationDetailsProps extends FlexBoxProps {
  skipBody?: boolean
  skipMeta?: boolean
  value?: XyoPayload
  viewSchemaUrl?: string
}
