import { FlexBoxProps } from '@xylabs/sdk-react'

import { PropertyAction } from './PropertyAction'

export interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
}
