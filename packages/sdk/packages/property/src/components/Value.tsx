// eslint-disable-next-line import/no-internal-modules
import type { Variant } from '@mui/material/styles/createTypography'
import { EllipsizeBox, EllipsizeBoxProps } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

export interface PropertyValueProps extends Omit<EllipsizeBoxProps, 'ref'> {
  typographyVariant?: Variant
  value?: string | number | boolean | null
}

export const PropertyValue = forwardRef<HTMLDivElement, PropertyValueProps>(({ typographyVariant = 'body1', value, ...props }, ref) => {
  return value === undefined ? null : (
    <EllipsizeBox typographyProps={{ component: undefined, title: value?.toString(), variant: typographyVariant }} width="100%" ref={ref} {...props}>
      {value}
    </EllipsizeBox>
  )
})

PropertyValue.displayName = 'PropertyValue'
