import { CircularProgress, TypographyVariant, useTheme } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'

import { IdenticonCorner } from './IdenticonCorner'
import { PropertyActionsMenu } from './PropertyActionsMenu'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './Title'
import { PropertyValue } from './Value'

export const Property: React.FC<PropertyProps> = ({
  border,
  borderColor,
  borderRadius,
  variant,
  title,
  color = 'secondary',
  value,
  children,
  size = 'medium',
  tip,
  actions,
  required,
  badge = false,
  ...props
}) => {
  const theme = useTheme()

  const sizeTitleHeight: Record<SizeProp, number> = {
    large: 36,
    medium: 20,
    small: 14,
  }

  const sizeValueHeight: Record<SizeProp, number> = {
    large: 64,
    medium: 36,
    small: 26,
  }

  const sizeVariants: Record<SizeProp, TypographyVariant> = {
    large: 'h6',
    medium: 'body1',
    small: 'body1',
  }

  const bgcolor = color === 'primary' || color === 'secondary' ? theme.palette[color].main : color

  return (
    <FlexCol
      minWidth={0}
      alignItems="stretch"
      border={border ?? variant === 'outlined' ? 1 : undefined}
      borderColor={borderColor ?? variant === 'outlined' ? theme.palette.divider : undefined}
      borderRadius={borderRadius ?? variant === 'outlined' ? theme.shape.borderRadius : undefined}
      overflow="hidden"
      {...props}
    >
      {title !== undefined ? (
        <PropertyTitle
          tip={tip}
          title={required ? `${title}*` : title}
          size={size}
          bgcolor={bgcolor}
          color={theme.palette.getContrastText(bgcolor)}
          height={sizeTitleHeight[size]}
          more={<PropertyActionsMenu actions={actions} />}
        />
      ) : null}
      <FlexRow justifyContent={value === undefined ? 'center' : 'space-between'} overflow="hidden" height={sizeValueHeight[size]}>
        {children ? (
          children
        ) : value !== undefined ? (
          <PropertyValue shortSpace={badge ? sizeValueHeight[size] : 0} value={value} typographyVariant={sizeVariants[size]} />
        ) : (
          <CircularProgress size={16} />
        )}
        {value !== undefined ? badge ? <IdenticonCorner value={value} /> : null : null}
      </FlexRow>
    </FlexCol>
  )
}
