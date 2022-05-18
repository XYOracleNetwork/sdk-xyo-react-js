import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { alpha, Card, CardActions, CardContent, CardMedia, CardProps, IconButton, Typography, useTheme, Zoom } from '@mui/material'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { ReactNode, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { useIsMobile } from '../../hooks'

export interface SimpleCardProps extends CardProps {
  headline: ReactNode
  desc?: ReactNode
  href?: string
  to?: To
  media?: string
  small?: boolean
  iconImage?: string
  interactionVariant?: 'button' | 'card'
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ iconImage, headline, small, desc, href, to, interactionVariant = 'card', media, ...props }) => {
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
    <Card
      elevation={raised ? 3 : 0}
      style={{ height: '100%', justifyContent: 'space-between', width: '100%' }}
      {...props}
      sx={{
        '&:hover': {
          cursor: interactionVariant == 'button' ? 'pointer' : null,
        },
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
      }}
      onMouseEnter={() => (isMobile ? null : interactionVariant == 'button' ? setRaised(true) : null)}
      onMouseLeave={() => (isMobile ? null : interactionVariant == 'button' ? setRaised(false) : null)}
      onClick={() => (interactionVariant == 'button' ? (href ? externalRouteChange(href) : to ? localRouteChange(to) : navigate('/404')) : null)}
    >
      {media ? <CardMedia component="img" height="100" image={media} alt="" /> : null}

      <CardContent>
        {iconImage ? <img src={iconImage} height="40px" style={{ paddingBottom: '8px' }} /> : null}
        {typeof headline === 'string' ? (
          <Typography fontWeight={700} variant={small ? 'body2' : 'body1'} textAlign="left" gutterBottom paddingBottom={1}>
            {headline}
          </Typography>
        ) : (
          headline
        )}
        <Typography variant={small ? 'caption' : 'body2'} fontWeight={400} textAlign="left" gutterBottom>
          {desc}
        </Typography>
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
    </Card>
  )
}
