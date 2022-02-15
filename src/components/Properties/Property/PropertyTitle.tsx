import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

export interface PropertyTitleProps extends FlexBoxProps {
  tip?: ReactNode
  title?: string
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({ tip, title, ...props }) => {
  const theme = useTheme()
  const aboveSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <FlexRow
      borderRight={aboveSm ? `solid 1px ${theme.palette.divider}` : undefined}
      justifyContent="flex-start"
      paddingX={aboveSm ? 2 : 1}
      paddingY={aboveSm ? 2 : 1}
      {...props}
    >
      <Typography noWrap variant="caption">
        {title}
      </Typography>
      {tip ? <QuickTipButton title={title ?? ''}>{tip}</QuickTipButton> : null}
    </FlexRow>
  )
}
