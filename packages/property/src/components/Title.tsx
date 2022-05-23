import { Typography, TypographyVariant, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

export interface PropertyTitleProps extends FlexBoxProps {
  tip?: ReactNode
  more?: ReactNode
  title?: string
  size?: SizeProp
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({ size = 'medium', tip, more, title, ...props }) => {
  const sizeVariants: Record<SizeProp, TypographyVariant> = {
    large: 'h6',
    medium: 'caption',
    small: 'caption',
  }

  const theme = useTheme()

  return (
    <FlexRow justifyContent="space-between" {...props}>
      <FlexRow paddingX={1}>
        <Typography noWrap variant={sizeVariants[size]}>
          {title}
        </Typography>
        {tip ? (
          <QuickTipButton style={{ fontSize: theme.typography[sizeVariants[size]].fontSize }} color="inherit" title={title ?? ''}>
            {tip}
          </QuickTipButton>
        ) : null}
      </FlexRow>
      {more}
    </FlexRow>
  )
}
