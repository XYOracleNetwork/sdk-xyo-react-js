import { FlexBoxProps } from '@xylabs/react-flexbox'

import { PropertyAction } from './Action'

export interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
  buttons?: boolean
}
