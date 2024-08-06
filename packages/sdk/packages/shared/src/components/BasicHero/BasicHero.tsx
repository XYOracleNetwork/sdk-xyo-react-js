import { Container, Grid, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import React, { ReactElement } from 'react'

import { useGradientStyles, useIsSmall } from '../../hooks/index.ts'

export interface BasicHeroProps extends FlexBoxProps {
  backgroundColor?: string
  backgroundImage?: string
  button1Href?: string
  button1Text?: string
  button1To?: string
  button2Href?: string
  button2Text?: string
  button2To?: string
  desc: string
  gradientTitle?: string
  heroImage?: string
  subLinkIcon?: ReactElement
  subLinkPath?: string
  subLinkText1?: string
  subLinkText2?: string
  sx?: Record<string, string>
  textColor?: string
  title: string
  title2?: string
}

interface SubLinkSectionProps {
  backgroundImageAlignment?: boolean
  subLinkIcon?: ReactElement
  subLinkPath?: string
  subLinkText1?: string
  subLinkText2?: string
}

interface ButtonSectionProps {
  buttonText?: string
  href?: string
  to?: string
}
const SubLinkSection: React.FC<SubLinkSectionProps> = ({ backgroundImageAlignment, subLinkIcon, subLinkPath, subLinkText1, subLinkText2 }) => {
  return (
    <FlexGrowRow
      width="100%"
      sx={{ flexDirection: { md: 'row', xs: 'column' }, justifyContent: { md: backgroundImageAlignment ? 'flex-start' : 'center', xs: 'center' } }}
    >
      {subLinkIcon
        ? (
            <span>
              {subLinkIcon}
&nbsp;
            </span>
          )
        : null}
      <Typography>
        {subLinkText1}
&nbsp;
      </Typography>
      <LinkEx href={subLinkPath} underline="always" target="_blank" color="inherit">
        <Typography>{subLinkText2}</Typography>
      </LinkEx>
    </FlexGrowRow>
  )
}

const ButtonSection: React.FC<ButtonSectionProps> = ({ href, to, buttonText }) => {
  const isMobile = useIsSmall()
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
  const isMobile = useIsSmall()
  const { classes } = useGradientStyles()
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
        ...sx,
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
                {title
                  ? <span>{`${title} `}</span>
                  : null}
                {gradientTitle
                  ? (
                      <span className={classes().heading}>
                        {' '}
                        {` ${gradientTitle}`}
                      </span>
                    )
                  : null}
                {title2
                  ? <span>{` ${title2}`}</span>
                  : null}
              </Typography>
              <Typography variant="body1" component="h2" gutterBottom textAlign={backgroundImage && !isMobile ? 'left' : 'center'}>
                {desc}
              </Typography>
              <FlexGrowRow sx={{ flexDirection: { lg: 'row', xs: 'column' } }} width="100%" marginTop={1}>
                <ButtonSection href={button1Href} to={button1To} buttonText={button1Text} />
                <ButtonSection href={button2Href} to={button2To} buttonText={button2Text} />
              </FlexGrowRow>
              <SubLinkSection
                subLinkIcon={subLinkIcon}
                subLinkText1={subLinkText1}
                subLinkText2={subLinkText2}
                subLinkPath={subLinkPath}
                backgroundImageAlignment={backgroundImage ? true : false}
              />
            </FlexGrowCol>
          </Grid>
          <Grid item xs={12} md={6}>
            {heroImage
              ? <img src={heroImage} width="100%" />
              : null}
          </Grid>
        </Grid>
      </Container>
    </FlexGrowCol>
  )
}
