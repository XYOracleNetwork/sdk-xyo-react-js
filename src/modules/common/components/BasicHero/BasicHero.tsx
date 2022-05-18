import { Container, Grid, Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexGrowCol, FlexGrowRow, LinkEx } from '@xylabs/sdk-react'
import { ReactElement } from 'react'

import { useIsMobile } from '../../hooks'
import { colorfulGradientDarkMode, colorfulGradientLightMode } from '../GradientText'

export interface BasicHeroProps extends FlexBoxProps {
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
  backgroundColor?: string
  textColor?: string
  backgroundImage?: string
  sx?: Record<string, string>
}

interface SubLinkSectionProps {
  subLinkText1?: string
  subLinkText2?: string
  subLinkPath?: string
  subLinkIcon?: ReactElement
}

interface ButtonSectionProps {
  href?: string
  to?: string
  buttonText?: string
}

const SubLinkSection: React.FC<SubLinkSectionProps> = ({ subLinkText1, subLinkText2, subLinkPath, subLinkIcon }) => {
  const isMobile = useIsMobile()
  return (
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
  )
}

const ButtonSection: React.FC<ButtonSectionProps> = ({ href, to, buttonText }) => {
  const isMobile = useIsMobile()
  return (
    <ButtonEx
      fullWidth={true}
      marginTop={1}
      marginBottom={1}
      marginRight={isMobile ? 2 : 1}
      marginLeft={isMobile ? 2 : 0}
      target={href ?? '_blank'}
      to={to}
      href={href}
      color="primary"
      variant="contained"
      paddingX={3}
      sx={{ display: href || to ? 'flex' : 'none' }}
    >
      {buttonText}
    </ButtonEx>
  )
}

export const BasicHero: React.FC<BasicHeroProps> = ({
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
  button2Href,
  button1Href,
  subLinkIcon,
  sx,
  ...props
}) => {
  const isMobile = useIsMobile()
  const theme = useTheme()
  const classes = theme.palette.mode === 'dark' ? colorfulGradientDarkMode() : colorfulGradientLightMode()
  return (
    <FlexGrowCol
      sx={{
        backgroundImage: `url(${backgroundImage})`,
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
          <Grid item xs={12} sm={8} md={backgroundImage ? 6 : 8} lg={backgroundImage ? 6 : 8}>
            <FlexGrowCol paddingY={2} sx={{ alignItems: { xs: backgroundImage && !isMobile ? 'flex-start' : 'center' } }}>
              <Typography variant="h1" component="h1" gutterBottom textAlign={backgroundImage && !isMobile ? 'left' : 'center'}>
                <span>{`${title} `}</span>
                <span className={classes.heading}> {` ${gradientTitle}`}</span>
                <span>{` ${title2}`}</span>
              </Typography>
              <Typography variant="body1" component="h2" gutterBottom textAlign={backgroundImage && !isMobile ? 'left' : 'center'}>
                {desc}
              </Typography>
              <FlexGrowRow sx={{ flexDirection: { lg: 'row', xs: 'column' } }} width="100%" marginTop={1}>
                <ButtonSection href={button1Href} to={button1To} buttonText={button1Text} />
                <ButtonSection href={button2Href} to={button2To} buttonText={button2Text} />
              </FlexGrowRow>
              <SubLinkSection subLinkIcon={subLinkIcon} subLinkText1={subLinkText1} subLinkText2={subLinkText2} subLinkPath={subLinkPath}></SubLinkSection>
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
