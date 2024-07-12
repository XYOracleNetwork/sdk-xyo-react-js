import { CardActionArea, CardActionAreaProps } from '@mui/material'
import { forwardRef } from 'react'

import { PayloadRenderProps } from '../PayloadRenderPlugin.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PayloadCardActionArea = forwardRef<HTMLDivElement, PayloadRenderProps & CardActionAreaProps>(({ payload, ...props }) => {
  return <CardActionArea {...props} />
})

PayloadCardActionArea.displayName = 'ButtonExXYLabs'
