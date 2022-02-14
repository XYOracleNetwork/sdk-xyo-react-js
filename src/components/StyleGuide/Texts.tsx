import { FlexCol } from '@xylabs/sdk-react'
import { Typography } from '@mui/material'

export const Texts = () => {
  return (
    <FlexCol>
      {[
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption',
        'overline',
      ].map(variant => (
        <Typography key={variant} variant={variant}>{variant} - XYO Network</Typography>
      ))}
    </FlexCol>
  )
}
