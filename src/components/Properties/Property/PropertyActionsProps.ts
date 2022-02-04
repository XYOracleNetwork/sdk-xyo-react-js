import { FlexBoxProps } from '@xylabs/sdk-react'

import { PropertyAction } from './PropertyAction'

interface PropertyActionsProps extends FlexBoxProps {
  actions?: PropertyAction[]
}

export type { PropertyActionsProps }
