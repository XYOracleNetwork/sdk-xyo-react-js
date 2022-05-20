import { CircularProgress, TypographyVariant, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'

import { IdenticonCorner } from './IdenticonCorner'
import { PropertyActionsMenu } from './PropertyActionsMenu'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { SizeProp } from './SizeProp'
import { PropertyValue } from './Value'

export const Property: React.FC<PropertyProps> = ({ title, value, children, size = 'medium', tip, actions, required, badge = false, ...props }) => {
  const theme = useTheme()

  const sizeTitleHeight: Record<SizeProp, number> = {
    large: 40,
    medium: 26,
    small: 18,
  }

  interface ValueProps extends FlexBoxProps {
    size?: SizeProp
  }

  const sizeValueHeight: Record<SizeProp, number> = {
    large: 60,
    medium: 30,
    small: 22,
  }

  const sizeVariants: Record<SizeProp, TypographyVariant> = {
    large: 'h6',
    medium: 'body1',
    small: 'caption',
  }

  return (
    <FlexCol
      minWidth={0}
      alignItems="stretch"
      border={1}
      borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider}
      borderRadius={1}
      overflow="hidden"
      {...props}
    >
      {title !== undefined ? (
        <PropertyTitle
          tip={tip}
          title={title}
          size={size}
          bgcolor={theme.palette.secondary.main}
          color={theme.palette.getContrastText(theme.palette.secondary.main)}
          height={sizeTitleHeight[size]}
          more={<PropertyActionsMenu actions={actions} />}
        />
      ) : null}
      <FlexRow justifyContent={value === undefined ? 'center' : 'space-between'} overflow="hidden" height={sizeValueHeight[size]}>
        {children !== undefined ? (
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
