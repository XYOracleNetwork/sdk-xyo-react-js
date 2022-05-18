/* eslint-disable complexity */
import { Container, Grid, Link, Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexGrowCol, FlexGrowRow, useMediaQuery } from '@xylabs/sdk-react'
import { ReactElement } from 'react'

import { useSettings } from '../Contexts'
import { defaultDesktopHeader, defaultMobileHeader } from './img'

interface Props extends FlexBoxProps {
  title: string
  desc: string
  button1Text?: string
  button2Text?: string
  button1To?: string
  button2To?: string
  button1Href?: string
  button2Href?: string
  subLinkText1?: string
  subLinkText2?: string
  subLinkPath?: string
  subLinkIcon?: ReactElement
  backgroundImageDesktopLight?: string
  backgroundImageDesktopDark?: string
  backgroundImageMobileLight?: string
  backgroundImageMobileDark?: string
}

export const BasicHeroSmall: React.FC<Props> = ({
  backgroundImageDesktopLight,
  backgroundImageDesktopDark,
  backgroundImageMobileLight,
  backgroundImageMobileDark,
  title,
  desc,
  subLinkText1,
  subLinkText2,
  subLinkPath,
  button1Text,
  button2Text,
  button2To,
  button1To,
  button2Href,
  button1Href,
  subLinkIcon,
  ...props
}) => {
  const { darkMode } = useSettings()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const desktopHeader = defaultDesktopHeader
  const mobileHeader = defaultMobileHeader
  const backgroundImageDesktop = (darkMode ? backgroundImageDesktopDark : backgroundImageDesktopLight) ?? desktopHeader
  const backgroundImageMobile = (darkMode ? backgroundImageMobileDark : backgroundImageMobileLight) ?? mobileHeader
  return (
    <FlexGrowCol
      sx={{
        backgroundImage: {
          md: `url(${backgroundImageDesktop})`,
          xs: null,
        },
        backgroundPosition: { md: 'center', xs: 'top' },
        maxHeight: '500px',
        minHeight: { lg: '350px', xs: '25vh' },
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      {...props}
    >
      <Container>
        <Grid container justifyContent="center" alignItems="center" sx={{ alignItems: { md: 'flex-start', xs: 'center' }, justifyContent: { md: 'flex-start', xs: 'center' } }}>
          <Grid item xs={10} md={5}>
            <FlexGrowCol alignItems={isMobile ? 'center' : 'flex-start'} paddingY={2}>
              <Typography variant="h3" component="h1" fontWeight={700} gutterBottom textAlign={isMobile ? 'center' : 'left'}>
                {title}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom textAlign={isMobile ? 'center' : 'left'}>
                {desc}
              </Typography>
              <FlexGrowRow sx={{ flexDirection: { lg: 'row', xs: 'column' } }} width="100%" marginTop={2}>
                {button1To || button1Href ? (
                  <ButtonEx
                    fullWidth={true}
                    marginTop={1}
                    marginBottom={2}
                    marginRight={isMobile ? 2 : 1}
                    marginLeft={isMobile ? 2 : 0}
                    target={button1Href ?? '_blank'}
                    to={button1To}
                    href={button1Href}
                    color="primary"
                    variant="contained"
                    padding={1}
                  >
                    {button1Text}
                  </ButtonEx>
                ) : null}
                {button2To || button2Href ? (
                  <ButtonEx
                    fullWidth={true}
                    marginTop={1}
                    marginBottom={2}
                    marginRight={isMobile ? 2 : 1}
                    marginLeft={isMobile ? 2 : 0}
                    target={button2Href ?? '_blank'}
                    to={button2To}
                    href={button2Href}
                    color="inherit"
                    variant="outlined"
                    padding={1}
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
                        <Link href={subLinkPath} underline="always" target="_blank" color="inherit">
                          {subLinkText2}
                        </Link>
                      )}
                    </FlexGrowRow>
                  </Grid>
                  <Grid item xs={12}>
                    {isMobile ? (
                      <FlexGrowRow width="100%" justifyContent="flex-start">
                        <Link href={subLinkPath} underline="always" target="_blank" color="inherit">
                          {subLinkText2}
                        </Link>
                      </FlexGrowRow>
                    ) : null}
                  </Grid>
                </Grid>
              ) : null}
            </FlexGrowCol>
          </Grid>
        </Grid>
      </Container>
      {isMobile ? (
        <FlexGrowRow width="100%">
          <img src={backgroundImageMobile} width="100%" height="auto" />
        </FlexGrowRow>
      ) : null}
    </FlexGrowCol>
  )
}
