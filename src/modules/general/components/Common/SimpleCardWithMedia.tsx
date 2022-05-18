import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { alpha, Card, CardActions, CardContent, CardMedia, IconButton, Typography, useTheme, Zoom } from '@mui/material'
import { ButtonEx, FlexCol, FlexGrowCol } from '@xylabs/sdk-react'
import { useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { useSettings } from '../Contexts'
import { useIsMobile } from '../hooks'
import { SimpleCardProps } from './SimpleCard'

export interface SimpleCardWithMediaProps extends SimpleCardProps {
  logoLight?: string
  logoDark?: string
  date?: string
}

export const SimpleCardWithMedia: React.FC<SimpleCardWithMediaProps> = ({
  name,
  date,
  small,
  iconButton,
  needsButton,
  logoDark,
  logoLight,
  cardIsButton,
  desc,
  href,
  to,
  media,
  linkText,
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
  const { darkMode } = useSettings()

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
      {media ? <CardMedia component="img" height="200" image={media} alt="" /> : null}

      <CardContent>
        {typeof name === 'string' ? (
          <FlexCol height="100%" alignItems="flex-start">
            {logoLight && logoDark ? <img src={darkMode ? logoLight : logoDark} height="30px" /> : null}
            <Typography color={darkMode ? 'secondary' : 'primary'} variant="caption" gutterBottom textAlign="left" marginTop={1}>
              {date}
            </Typography>
            <Typography variant="body1" textAlign="left" fontWeight={600}>
              {name}
            </Typography>
          </FlexCol>
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
