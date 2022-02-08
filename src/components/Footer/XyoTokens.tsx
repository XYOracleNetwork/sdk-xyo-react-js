import { Link, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import React from 'react'

const XyoTokens: React.FC<FlexBoxProps> = (props) => (
  <FlexCol {...props}>
    <Typography margin={1} variant="h6">
      XYO Tokens
    </Typography>
    <Link margin={1} href="https://xyo.network/token/" variant="body1">
      XYO Tokens
    </Link>
    <Link margin={1} href="https://xyo.network/fhr/" target="_blank" variant="body1">
      FHR Benefits
    </Link>
  </FlexCol>
)

export { XyoTokens }
