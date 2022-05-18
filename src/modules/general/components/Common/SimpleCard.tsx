import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { alpha, Card, CardActions, CardContent, CardMedia, CardProps, IconButton, Typography, useTheme, Zoom } from '@mui/material'
import { ButtonEx, FlexGrowCol } from '@xylabs/sdk-react'
import { ReactNode, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { useIsMobile } from '../hooks'

export interface SimpleCardProps extends CardProps {
  name: ReactNode
  desc?: ReactNode
  needsButton?: boolean
  href?: string
  to?: To
  linkText?: string
  media?: string
  small?: boolean
  cardIsButton?: boolean
  iconButton?: boolean
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ name, small, iconButton, needsButton, cardIsButton, desc, href, to, media, linkText, ...props }) => {
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
          cursor: 'pointer',
        },
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
      }}
      onMouseEnter={() => (isMobile ? null : cardIsButton ? setRaised(true) : null)}
      onMouseLeave={() => (isMobile ? null : cardIsButton ? setRaised(false) : null)}
      onClick={() => (cardIsButton ? (href ? externalRouteChange(href) : to ? localRouteChange(to) : navigate('/404')) : null)}
    >
      {media ? <CardMedia component="img" height="100" image={media} alt="" /> : null}

      <CardContent>
        {typeof name === 'string' ? (
          <Typography fontWeight={700} variant="body1" textAlign="left" gutterBottom paddingBottom={1}>
            {name}
          </Typography>
        ) : (
          name
        )}
        <Typography variant="body2" fontWeight={400} textAlign="left" gutterBottom>
          {desc}
        </Typography>
      </CardContent>

      {needsButton ? (
        <CardActions>
          <FlexGrowCol alignItems="flex-end">
            {iconButton ? (
              <Zoom in={raised}>
                <IconButton
                  color="primary"
                  size={small ? 'small' : 'medium'}
                  onClick={() => (href ? externalRouteChange(href) : to ? localRouteChange(to) : navigate('/404'))}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                >
                  <ArrowForwardRoundedIcon fontSize={small ? 'small' : 'medium'} />
                </IconButton>
              </Zoom>
            ) : (
              <ButtonEx color="primary" variant="text" href={href} disabled={href || to ? false : true} to={to} endIcon={<ArrowForwardRoundedIcon fontSize="small" />}>
                <Typography variant="button"> {linkText ?? (to || href) ? 'Learn More' : 'Coming Soon'}</Typography>
              </ButtonEx>
            )}
          </FlexGrowCol>
        </CardActions>
      ) : null}
    </Card>
  )
}
