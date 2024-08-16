import type { CardActionAreaProps } from '@mui/material'
import { CardActionArea } from '@mui/material'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @eslint-react/ensure-forward-ref-using-ref
export const PayloadCardActionArea = forwardRef<HTMLDivElement, PayloadRenderProps & CardActionAreaProps>(({ ref, payload, ...props }) => {
  return <CardActionArea {...props} />
})

PayloadCardActionArea.displayName = 'ButtonExXYLabs'
