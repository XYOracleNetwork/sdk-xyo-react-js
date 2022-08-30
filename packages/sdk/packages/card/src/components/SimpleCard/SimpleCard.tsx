import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { alpha, CardActions, CardContent, CardMedia, IconButton, Typography, useTheme } from '@mui/material'
import { FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { useIsMobile } from '@xyo-network/react-shared'
import { ReactNode, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { CardEx, CardExProps } from '../CardEx'

export interface SimpleCardProps extends CardExProps {
  headline?: ReactNode
  desc?: ReactNode
  href?: string
  to?: To
  media?: string
  small?: boolean
  iconImage?: string
  interactionVariant?: 'button' | 'card'
  subtitle?: string
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  iconImage,
  subtitle,
  headline,
  small,
  desc,
  href,
  to,
  interactionVariant = 'card',
  media,
  ...props
}) => {
  const theme = useTheme()
  const [raised, setRaised] = useState(false)
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const localRouteChange = (to: To | undefined) => {
    to ? navigate(to) : navigate('/404')
  }
  const externalRouteChange = (href: string | undefined) => {
    href ? window.open(href) : navigate('/404')
  }
  return (
    <CardEx
      elevation={raised ? 3 : 0}
      style={{ height: '100%', justifyContent: 'space-between', width: '100%' }}
      sx={{
        '&:hover': {
          cursor: interactionVariant == 'button' ? 'pointer' : null,
        },
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
      }}
      onMouseEnter={() => (isMobile ? null : interactionVariant == 'button' ? setRaised(true) : null)}
      onMouseLeave={() => (isMobile ? null : interactionVariant == 'button' ? setRaised(false) : null)}
      onClick={() => (interactionVariant == 'button' ? (href ? externalRouteChange(href) : to ? localRouteChange(to) : navigate('/404')) : null)}
      {...props}
    >
      {media ? <CardMedia component="img" height="100" image={media} alt="" /> : null}

      <CardContent sx={{ height: '100%' }}>
        <FlexCol width="100%" alignItems="flex-start">
          {iconImage ? <img src={iconImage} height="40px" style={{ paddingBottom: '8px' }} /> : null}
          {typeof headline === 'string' ? (
            <Typography variant={small ? 'body1' : 'h6'} textAlign="left" gutterBottom>
              {headline}
            </Typography>
          ) : (
            headline
          )}
          {subtitle ? (
            <Typography variant="subtitle2" textAlign="left" gutterBottom>
              {subtitle}
            </Typography>
          ) : null}
          <Typography variant={small ? 'caption' : 'body1'} textAlign="left" gutterBottom>
            {desc}
          </Typography>
        </FlexCol>
      </CardContent>
      {interactionVariant == 'button' ? (
        <CardActions>
          <FlexGrowCol alignItems="flex-end">
            <IconButton
              color={raised ? 'secondary' : 'primary'}
              size={small ? 'small' : 'medium'}
              onClick={() => (href ? externalRouteChange(href) : to ? localRouteChange(to) : navigate('/404'))}
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              <ArrowForwardRoundedIcon fontSize={small ? 'small' : 'medium'} />
            </IconButton>
          </FlexGrowCol>
        </CardActions>
      ) : null}
    </CardEx>
  )
}
