/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CardActionAreaProps } from '@mui/material'
import { CardActionArea } from '@mui/material'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardActionArea: React.FC<PayloadRenderProps & CardActionAreaProps> = ({ payload, ...props }) => {
  return <CardActionArea {...props} />
}

PayloadCardActionArea.displayName = 'ButtonExXYLabs'
