import { Container, Grid, Typography } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexGrowCol, FlexGrowRow, LinkEx } from '@xylabs/sdk-react'
import { ReactElement } from 'react'

import { useSettings } from '../Contexts'
import { useIsMobile } from '../hooks'
import { colorfulGradientDarkMode, colorfulGradientLightMode } from './GradientTextClass'
import { defaultDesktopHeader } from './img'

interface Props extends FlexBoxProps {
  title: string
  gradientTitle?: string
  title2?: string
  desc: string
  button1Text?: string
  button2Text?: string
  button1To?: string
  button2To?: string
  button1Href?: string
  button2Href?: string
  subLinkText1?: string
  subLinkText2?: string
  heroImage?: string
  subLinkPath?: string
  subLinkIcon?: ReactElement
  useBackgroundImage?: boolean
  backgroundColor?: string
  textColor?: string
  backgroundImage?: string
  sx?: Record<string, string>
}
//TODO - create a new version which favors composition via HOC
// eslint-disable-next-line complexity
export const BasicHero: React.FC<Props> = ({
  backgroundImage,
  title,
  gradientTitle,
  backgroundColor,
  textColor,
  desc,
  heroImage,
  title2,
  subLinkText1,
  subLinkText2,
  subLinkPath,
  button1Text,
  button2Text,
  button2To,
  button1To,
  useBackgroundImage = false,
  button2Href,
  button1Href,
  subLinkIcon,
  sx,
  ...props
}) => {
  const isMobile = useIsMobile()
  const { darkMode } = useSettings()
  const classes = darkMode ? colorfulGradientDarkMode() : colorfulGradientLightMode()
  return (
    <FlexGrowCol
      sx={{
        backgroundImage: useBackgroundImage ? `url(${backgroundImage ? backgroundImage : defaultDesktopHeader})` : null,
        backgroundPosition: { lg: 'bottom', md: 'center left', xs: 'top left' },
        minHeight: {
          md: '500px',
          sm: '400px',
          xs: '200px',
        },
        ...(sx ?? {}),
      }}
      style={{
        backgroundColor: backgroundColor ?? '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: textColor ?? '',
      }}
      {...props}
    >
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            alignItems: { xs: 'center' },
            justifyContent: { xs: 'center' },
          }}
        >
          <Grid item xs={12} sm={8} md={useBackgroundImage ? 6 : 8} lg={useBackgroundImage ? 6 : 8}>
            <FlexGrowCol paddingY={2} sx={{ alignItems: { xs: useBackgroundImage && !isMobile ? 'flex-start' : 'center' } }}>
              <Typography variant="h1" component="h1" gutterBottom textAlign={useBackgroundImage && !isMobile ? 'left' : 'center'}>
                {title ? <span>{`${title} `}</span> : null}
                {gradientTitle ? <span className={classes.heading}> {` ${gradientTitle}`}</span> : null}
                {title2 ? <span>{` ${title2}`}</span> : null}
              </Typography>
              <Typography variant="body1" component="h2" gutterBottom textAlign={useBackgroundImage && !isMobile ? 'left' : 'center'}>
                {desc}
              </Typography>
              <FlexGrowRow sx={{ flexDirection: { lg: 'row', xs: 'column' } }} width="100%" marginTop={1}>
                {button1To || button1Href ? (
                  <ButtonEx
                    fullWidth={true}
                    marginTop={1}
                    marginBottom={1}
                    marginRight={isMobile ? 2 : 1}
                    marginLeft={isMobile ? 2 : 0}
                    target={button1Href ?? '_blank'}
                    to={button1To}
                    href={button1Href}
                    color="primary"
                    variant="contained"
                    paddingX={3}
                  >
                    {button1Text}
                  </ButtonEx>
                ) : null}
                {button2To || button2Href ? (
                  <ButtonEx
                    fullWidth={true}
                    marginTop={1}
                    marginBottom={1}
                    marginRight={isMobile ? 2 : 1}
                    marginLeft={isMobile ? 2 : 0}
                    target={button2Href ?? '_blank'}
                    to={button2To}
                    href={button2Href}
                    color="inherit"
                    variant="outlined"
                    paddingX={3}
                  >
                    {button2Text}
                  </ButtonEx>
                ) : null}
              </FlexGrowRow>
              {subLinkText1 && subLinkText2 && subLinkPath ? (
                <Grid container>
                  <Grid item xs={12}>
                    <FlexGrowRow width="100%" justifyContent="flex-start">
                      {subLinkIcon} &nbsp;
                      <Typography>{subLinkText1}&nbsp;</Typography>
                      {isMobile ? null : (
                        <LinkEx href={subLinkPath} underline="always" target="_blank" color="inherit">
                          <Typography>{subLinkText2}</Typography>
                        </LinkEx>
                      )}
                    </FlexGrowRow>
                  </Grid>
                  <Grid item xs={12}>
                    {isMobile ? (
                      <FlexGrowRow width="100%" justifyContent="flex-start">
                        <LinkEx href={subLinkPath} underline="always" target="_blank" color="inherit">
                          <Typography>{subLinkText2}</Typography>
                        </LinkEx>
                      </FlexGrowRow>
                    ) : null}
                  </Grid>
                </Grid>
              ) : null}
            </FlexGrowCol>
          </Grid>
          <Grid item xs={12} md={6}>
            {heroImage ? <img src={heroImage} width="100%" /> : null}
          </Grid>
        </Grid>
      </Container>
    </FlexGrowCol>
  )
}
