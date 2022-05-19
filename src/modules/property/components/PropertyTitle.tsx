import { Typography, TypographyVariant } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

import { SizeProp } from './SizeProp'

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

  return (
    <FlexRow justifyContent="space-between" {...props}>
      <FlexRow paddingX={1}>
        <Typography noWrap variant={sizeVariants[size]}>
          {title}
        </Typography>
        {tip ? (
          <QuickTipButton color="inherit" title={title ?? ''}>
            {tip}
          </QuickTipButton>
        ) : null}
      </FlexRow>
      {more}
    </FlexRow>
  )
}
