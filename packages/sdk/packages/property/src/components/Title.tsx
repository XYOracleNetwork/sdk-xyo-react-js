import type { TypographyVariant } from '@mui/material'
import { darken, lighten, Typography, useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import type { SizeProp } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React from 'react'

export type TitleSizeProp = SizeProp | 'full'

export interface PropertyTitleProps extends FlexBoxProps {
  elevation?: number
  more?: ReactNode
  size?: TitleSizeProp
  tip?: ReactNode
  title?: string
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({ elevation = 1, size = 'medium', tip, more, title, ...props }) => {
  const sizeVariants: Record<TitleSizeProp, TypographyVariant> = {
    full: 'caption',
    large: 'caption',
    medium: 'caption',
    small: 'caption',
  }

  const sizeTitleHeight: Record<TitleSizeProp, number | undefined> = {
    full: undefined,
    large: 32,
    medium: 20,
    small: 16,
  }

  const sizeFontSize: Record<TitleSizeProp, number> = {
    full: 16,
    large: 16,
    medium: 14,
    small: 10,
  }

  const quickTipSize = sizeFontSize[size] < 16 ? sizeFontSize[size] : 16

  const theme = useTheme()

  return (
    <FlexRow
      bgcolor={
        theme.palette.mode === 'dark'
          ? lighten(theme.palette.background.paper, 0.05 * elevation)
          : darken(theme.palette.background.paper, 0.025 * elevation)
      }
      alignItems="center"
      height={sizeTitleHeight[size]}
      justifyContent="space-between"
      {...props}
    >
      <FlexRow paddingX={1} paddingY={0.5}>
        <Typography fontWeight={500} noWrap variant={sizeVariants[size]} fontSize={sizeFontSize[size]}>
          <small>
            <strong>{title}</strong>
          </small>
        </Typography>
        {tip
          ? (
              <QuickTipButton style={{ fontSize: quickTipSize }} color="inherit" title={title ?? ''}>
                {tip}
              </QuickTipButton>
            )
          : null}
      </FlexRow>
      {more}
    </FlexRow>
  )
}
