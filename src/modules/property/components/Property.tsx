import { CircularProgress, TypographyVariant, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow, FlexRow, WithChildren } from '@xylabs/sdk-react'

import { IdenticonCorner } from './IdenticonCorner'
import { PropertyActionsMenu } from './PropertyActionsMenu'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { SizeProp } from './SizeProp'
import { PropertyValue } from './Value'

export const Property: React.FC<PropertyProps> = ({ title, value, children, size = 'medium', tip, actions, required, badge = false, ...props }) => {
  const theme = useTheme()
  const minHeight = 48

  const sizeTitleHeight: Record<SizeProp, number> = {
    large: 40,
    medium: 26,
    small: 18,
  }

  const Value: React.FC<WithChildren<{ size?: SizeProp }>> = ({ size = 'medium', children }) => {
    const sizeVariants: Record<SizeProp, TypographyVariant> = {
      large: 'h6',
      medium: 'body1',
      small: 'caption',
    }

    const sizeValueHeight: Record<SizeProp, number> = {
      large: 60,
      medium: 30,
      small: 22,
    }

    return (
      <FlexRow height={sizeValueHeight[size]} justifyContent="flex-start" paddingLeft={1} paddingRight={badge ? 4 : 1}>
        {value === undefined ? (
          <FlexGrowRow minHeight={minHeight}>
            <CircularProgress size={16} />
          </FlexGrowRow>
        ) : children ? (
          children
        ) : (
          <PropertyValue value={value} typographyVariant={sizeVariants[size]} />
        )}
      </FlexRow>
    )
  }

  const sizedHeight = (size === 'small' ? 40 : 56) * (belowStackBreak ? 2 : 1)

  return (
    <FlexCol alignItems="stretch" border={1} borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider} borderRadius={1} {...props}>
      <PropertyTitle
        tip={tip}
        title={title}
        size={size}
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.getContrastText(theme.palette.secondary.main)}
        height={sizeTitleHeight[size]}
        more={<PropertyActionsMenu actions={actions} />}
      />
      <FlexRow flexWrap="wrap" justifyContent="space-between" overflow="hidden">
        <Value size={size}>{children}</Value>
        {value ? badge ? <IdenticonCorner value={value} /> : null : null}
      </FlexRow>
    </FlexCol>
  )
}
