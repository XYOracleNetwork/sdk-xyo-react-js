import type { FlexBoxProps } from '@xylabs/react-flexbox'

import type { PropertyAction } from './Action.ts'

export interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
  buttons?: boolean
}
