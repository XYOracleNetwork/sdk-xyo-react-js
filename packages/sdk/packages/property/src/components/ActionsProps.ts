import { FlexBoxProps } from '@xylabs/react-flexbox'

import { PropertyAction } from './Action.ts'

export interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
  buttons?: boolean
}
