import { FlexBoxProps } from '@xylabs/react-flexbox'

import { PropertyAction } from './Action.js'

export interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
  buttons?: boolean
}
