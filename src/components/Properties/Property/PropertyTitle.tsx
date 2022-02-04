import { Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

export interface PropertyTitleProps extends FlexBoxProps {
  tip?: ReactNode
  title?: string
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({ tip, title, ...props }) => {
  const theme = useTheme()
  return (
    <FlexRow
      borderRight={`solid 1px ${theme.palette.divider}`}
      justifyContent="flex-start"
      paddingX={2}
      paddingY={0.5}
      {...props}
    >
      {tip ? <QuickTipButton title={title ?? ''}>{tip}</QuickTipButton> : null}
      <Typography noWrap variant="caption">
        {title}
      </Typography>
    </FlexRow>
  )
}
