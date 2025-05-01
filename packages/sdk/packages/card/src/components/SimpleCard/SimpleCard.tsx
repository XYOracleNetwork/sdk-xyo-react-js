import { ArrowForwardRounded as ArrowForwardRoundedIcon } from '@mui/icons-material'
import {
  CardActions, CardContent, CardMedia, IconButton, Typography, useTheme,
} from '@mui/material'
import { FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { alphaCss, useIsSmall } from '@xylabs/react-theme'
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import type { CardExProps } from '../CardEx.tsx'
import { CardEx } from '../CardEx.tsx'

export interface SimpleCardProps extends CardExProps {
  desc?: ReactNode
  headline?: ReactNode
  href?: string
  iconImage?: string
  interactionVariant?: 'button' | 'card'
  media?: string
  small?: boolean
  subtitle?: string
  to?: To
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  children,
  desc,
  iconImage,
  interactionVariant = 'card',
  headline,
  href,
  media,
  small,
  subtitle,
  sx,
  to,
  ...props
}) => {
  const theme = useTheme()
  const [raised, setRaised] = useState(false)
  const navigate = useNavigate()
  const isSmall = useIsSmall()
  const localRouteChange = (to: To | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    to ? void navigate(to) : void navigate('/404')
  }
  const externalRouteChange = (href: string | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    href ? void window.open(href) : void navigate('/404')
  }
  return (
    <CardEx
      elevation={raised ? 3 : 0}
      sx={{
        '&:hover': { cursor: interactionVariant == 'button' ? 'pointer' : null },
        'backgroundColor': alphaCss(theme.vars.palette.primary.main, 0.05),
        ...sx,
      }}
      onMouseEnter={() =>
        isSmall
          ? null
          : interactionVariant == 'button'
            ? setRaised(true)
            : null}
      onMouseLeave={() =>
        isSmall
          ? null
          : interactionVariant == 'button'
            ? setRaised(false)
            : null}
      onClick={() =>
        interactionVariant == 'button'
          ? href
            ? externalRouteChange(href)
            : to
              ? localRouteChange(to)
              : navigate('/404')
          : null}
      {...props}
    >
      {media
        ? <CardMedia component="img" height="100" image={media} alt="" />
        : null}

      <CardContent sx={{ height: '100%' }}>
        <FlexCol width="100%" alignItems="flex-start">
          {iconImage
            ? <img src={iconImage} height="40px" style={{ paddingBottom: '8px' }} />
            : null}
          {typeof headline === 'string'
            ? (
                <Typography variant={small ? 'body1' : 'h6'} textAlign="left" gutterBottom>
                  {headline}
                </Typography>
              )
            : headline}
          {subtitle
            ? (
                <Typography variant="subtitle2" textAlign="left" gutterBottom>
                  {subtitle}
                </Typography>
              )
            : null}
          <Typography variant={small ? 'caption' : 'body1'} textAlign="left" gutterBottom>
            {desc}
          </Typography>
        </FlexCol>
      </CardContent>
      {children}
      {interactionVariant == 'button'
        ? (
            <CardActions>
              <FlexGrowCol alignItems="flex-end">
                <IconButton
                  color={raised ? 'secondary' : 'primary'}
                  size={small ? 'small' : 'medium'}
                  onClick={() =>
                    href
                      ? externalRouteChange(href)
                      : to
                        ? localRouteChange(to)
                        : navigate('/404')}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                >
                  <ArrowForwardRoundedIcon fontSize={small ? 'small' : 'medium'} />
                </IconButton>
              </FlexGrowCol>
            </CardActions>
          )
        : null}
    </CardEx>
  )
}
