import type { TypographyExProps } from '@xyo-network/react-shared'
import { TypographyEx } from '@xyo-network/react-shared'
import React from 'react'

export const GweiLabelTypography: React.FC<TypographyExProps> = props => (
  <TypographyEx variant="caption" {...props}>
    GWEI
  </TypographyEx>
)
