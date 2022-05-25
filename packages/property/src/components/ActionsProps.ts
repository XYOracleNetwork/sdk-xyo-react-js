import { FlexBoxProps } from '@xylabs/sdk-react'

import { PropertyAction } from './Action'

export interface PropertyActionsProps extends FlexBoxProps {
  buttons?: boolean
  actions?: PropertyAction[]
}
