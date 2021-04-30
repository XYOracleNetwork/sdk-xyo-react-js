import { Link, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import CookieConsent, { CookieConsentProps } from 'react-cookie-consent'

import { FlexGrowPaper } from './FlexBox'

const CustomCookieConsent: React.FC<CookieConsentProps> = (props) => {
  const { buttonStyle, style, ...rootProps } = props
  const theme = useTheme()
  return (
    <CookieConsent
      buttonStyle={{
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        ...buttonStyle,
      }}
      buttonText="Accept"
      cookieName="CookiesAccepted"
      expires={150}
      location="bottom"
      style={{
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'none',
        justifyContent: 'stretch',
        ...style,
      }}
      {...rootProps}
    >
      <FlexGrowPaper justifyContent="flex-start">
        <Typography variant="body2">
          This site uses{' '}
          <Link href="https://cookiesandyou.com/" rel="noopener noreferrer" target="_blank">
            cookies
          </Link>{' '}
          and{' '}
          <Link href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
            Google&nbsp;tools
          </Link>{' '}
          to analyze traffic and for ads measurement purposes.
        </Typography>
      </FlexGrowPaper>
    </CookieConsent>
  )
}

export default CustomCookieConsent
