import { ArrowForwardRounded as ArrowForwardRoundedIcon } from '@mui/icons-material'
import { alpha, Card, CardActions, CardContent, CardMedia, CardProps, Grid, IconButton, Typography, useTheme, Zoom } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { useIsMobile } from '@xyo-network/react-shared'
import { ReactNode, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

export interface FullWidthCardProps extends CardProps {
  cardIsButton?: boolean
  desc?: ReactNode
  href?: string
  linkText?: string
  media?: string
  name: ReactNode
  small?: boolean
  to?: To
}

export const FullWidthCard: React.FC<FullWidthCardProps> = ({ cardIsButton, desc, href, media, name, small, to, ...props }) => {
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
      style={{ height: '100%', width: '100%' }}
      {...props}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
        'backgroundColor': alpha(theme.palette.primary.light, 0.05),
      }}
      onMouseEnter={() =>
        isMobile
          ? null
          : cardIsButton
            ? setRaised(true)
            : null}
      onMouseLeave={() =>
        isMobile
          ? null
          : cardIsButton
            ? setRaised(false)
            : null}
      onClick={() =>
        cardIsButton
          ? href
            ? externalRouteChange(href)
            : to
              ? localRouteChange(to)
              : navigate('/404')
          : null}
    >
      {media
        ? <CardMedia component="img" height="100" image={media} alt="" />
        : null}

      <CardContent>
        <Grid container alignItems="center" paddingY={2} paddingX={2}>
          <Grid item xs={12} md={6}>
            {typeof name === 'string'
              ? (
                  <Typography fontWeight={700} variant="h2" textAlign="left" paddingBottom={1}>
                    {name}
                  </Typography>
                )
              : name}
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="body1" fontWeight={400} textAlign="left">
              {desc}
            </Typography>
          </Grid>
          <Grid item xs={1} display={isMobile ? 'none' : 'flex'} justifyContent="center">
            <Zoom in={raised}>
              <IconButton
                color="primary"
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
            </Zoom>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: { md: isMobile ? 'flex' : 'none' } }}>
        <FlexGrowCol alignItems="flex-end">
          <IconButton
            color="primary"
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
    </Card>
  )
}
