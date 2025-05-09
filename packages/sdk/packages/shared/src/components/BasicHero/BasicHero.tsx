import {
  Container, Grid, styled, Typography,
} from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { useIsSmall } from '@xylabs/react-theme'
import type { ReactElement } from 'react'
import React from 'react'
import type { To } from 'react-router-dom'

import { useGradientStyles } from '../../hooks/index.ts'

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

interface ButtonSectionBaseProps {
  buttonText?: string
}

interface ButtonSectionHrefProps extends ButtonSectionBaseProps {
  href?: string
  to?: never
}

interface ButtonSectionToProps extends ButtonSectionBaseProps {
  href?: never
  to?: To
}

interface ButtonSectionClickProps extends ButtonSectionBaseProps {
  href?: never
  to?: never
}

type ButtonSectionProps = ButtonSectionHrefProps | ButtonSectionToProps | ButtonSectionClickProps

const SubLinkSection: React.FC<SubLinkSectionProps> = ({
  backgroundImageAlignment, subLinkIcon, subLinkPath, subLinkText1, subLinkText2,
}) => {
  return (
    <FlexGrowRow
      width="100%"
      sx={{
        flexDirection: { md: 'row', xs: 'column' },
        justifyContent: { md: backgroundImageAlignment ? 'flex-start' : 'center', xs: 'center' },
      }}
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

const ButtonSection: React.FC<ButtonSectionProps> = ({
  href, to, buttonText,
}) => {
  const isMobile = useIsSmall()
  return href
    ? (
        <ButtonEx
          fullWidth={true}
          marginTop={1}
          marginBottom={1}
          marginRight={isMobile ? 2 : 1}
          marginLeft={isMobile ? 2 : 0}
          target={href ?? '_blank'}
          href={href}
          color="primary"
          variant="contained"
          paddingX={3}
          sx={{ display: href || to ? 'flex' : 'none' }}
        >
          {buttonText}
        </ButtonEx>
      )
    : to
      ? (
          <ButtonEx
            fullWidth={true}
            marginTop={1}
            marginBottom={1}
            marginRight={isMobile ? 2 : 1}
            marginLeft={isMobile ? 2 : 0}
            to={to}
            color="primary"
            variant="contained"
            paddingX={3}
            sx={{ display: href || to ? 'flex' : 'none' }}
          >
            {buttonText}
          </ButtonEx>
        )
      : (
          <ButtonEx
            fullWidth={true}
            marginTop={1}
            marginBottom={1}
            marginRight={isMobile ? 2 : 1}
            marginLeft={isMobile ? 2 : 0}
            color="primary"
            variant="contained"
            paddingX={3}
            sx={{ display: href || to ? 'flex' : 'none' }}
          >
            {buttonText}
          </ButtonEx>
        )
}

// eslint-disable-next-line complexity
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
  const styles = useGradientStyles()

  const StyledSpan = styled('span')({ ...styles.heading })

  return (
    <FlexGrowCol
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: {
          lg: 'bottom', md: 'center left', xs: 'top left',
        },
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
          <Grid size={{
            xs: 12, sm: 8, md: backgroundImage ? 6 : 8, lg: backgroundImage ? 6 : 8,
          }}
          >
            <FlexGrowCol paddingY={2} sx={{ alignItems: { xs: backgroundImage && !isMobile ? 'flex-start' : 'center' } }}>
              <Typography variant="h1" component="h1" gutterBottom textAlign={backgroundImage && !isMobile ? 'left' : 'center'}>
                {title
                  ? <span>{`${title} `}</span>
                  : null}
                {gradientTitle
                  ? (
                      <StyledSpan>
                        {' '}
                        {` ${gradientTitle}`}
                      </StyledSpan>
                    )
                  : null}
                {title2
                  ? <span>{` ${title2}`}</span>
                  : null}
              </Typography>
              <Typography variant="body1" component="h2" gutterBottom textAlign={backgroundImage && !isMobile ? 'left' : 'center'}>
                {desc}
              </Typography>
              <FlexGrowRow
                sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
                width="100%"
                marginTop={1}
              >
                {
                  button1Href
                    ? <ButtonSection href={button1Href} buttonText={button1Text} />
                    : button1To ? <ButtonSection to={button1To} buttonText={button1Text} /> : <ButtonSection buttonText={button1Text} />
                }
                {
                  button2Href
                    ? <ButtonSection href={button2Href} buttonText={button2Text} />
                    : button2To ? <ButtonSection to={button2To} buttonText={button2Text} /> : <ButtonSection buttonText={button2Text} />
                }
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
          <Grid size={{ xs: 12, md: 6 }}>
            {heroImage
              ? <img src={heroImage} width="100%" />
              : null}
          </Grid>
        </Grid>
      </Container>
    </FlexGrowCol>
  )
}
