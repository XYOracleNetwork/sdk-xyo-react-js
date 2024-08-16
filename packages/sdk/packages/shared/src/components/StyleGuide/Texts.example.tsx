import type { TypographyVariant } from '@mui/material'
import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

export const TextsExample = () => {
  const variantList: TypographyVariant[] = [
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
  ]

  return (
    <FlexCol>
      {variantList.map(variant => (
        <Typography key={variant} variant={variant}>
          {variant}
          {' '}
          - XYO Network
        </Typography>
      ))}
    </FlexCol>
  )
}
