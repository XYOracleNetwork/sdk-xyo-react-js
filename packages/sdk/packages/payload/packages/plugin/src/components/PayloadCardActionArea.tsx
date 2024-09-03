/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CardActionAreaProps } from '@mui/material'
import { CardActionArea } from '@mui/material'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardActionArea = forwardRef<HTMLButtonElement, PayloadRenderProps & CardActionAreaProps>(({ payload, ...props }, ref) => {
  return <CardActionArea ref={ref} {...props} />
})

PayloadCardActionArea.displayName = 'ButtonExXYLabs'
