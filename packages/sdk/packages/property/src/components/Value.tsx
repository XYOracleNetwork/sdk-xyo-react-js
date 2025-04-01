import type { TypographyVariant } from '@mui/material'
import type { EllipsizeBoxProps } from '@xyo-network/react-shared'
import { EllipsizeBox } from '@xyo-network/react-shared'
import React from 'react'

export interface PropertyValueProps extends EllipsizeBoxProps {
  typographyVariant?: TypographyVariant
  value?: string | number | boolean | null
}

export const PropertyValue = ({
  ref, typographyVariant = 'body1', value, ...props
}: PropertyValueProps) => {
  return value === undefined
    ? null
    : (
        <EllipsizeBox
          typographyProps={{
            component: undefined, title: value?.toString(), variant: typographyVariant,
          }}
          width="100%"
          ref={ref}
          {...props}
        >
          {value}
        </EllipsizeBox>
      )
}

PropertyValue.displayName = 'PropertyValue'
