import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

import { PropertyHeroProps } from './PropertyHeroProps'

export interface PropertyTitleProps extends PropertyHeroProps, FlexBoxProps {
  tip?: ReactNode
  title?: string
  paddingFactor: number
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({
  isHero = false,
  tip,
  title,
  paddingFactor,
  ...props
}) => {
  const theme = useTheme()
  const aboveSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <FlexRow
      borderRight={aboveSm && isHero === false ? `solid 1px ${theme.palette.divider}` : 'none'}
      justifyContent="flex-start"
      padding={theme.spacing(paddingFactor, paddingFactor)}
      {...props}
    >
      <Typography noWrap variant={isHero ? 'h2' : 'caption'} fontWeight={isHero ? 'bold' : 'regular'}>
        {title}
      </Typography>
      {tip ? <QuickTipButton title={title ?? ''}>{tip}</QuickTipButton> : null}
    </FlexRow>
  )
}
