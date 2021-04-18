import { Link, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import CookieConsent from 'react-cookie-consent'

import { FlexGrowRow } from './FlexBox'

const CustomCookieConsent: React.FC = () => {
  const theme = useTheme()
  return (
    <CookieConsent
      buttonStyle={{
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      }}
      buttonText="Accept"
      cookieName="CookiesAccepted"
      expires={150}
      location="bottom"
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'none',
        zoom: 0.75,
      }}
    >
      <FlexGrowRow>
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
      </FlexGrowRow>
    </CookieConsent>
  )
}

export default CustomCookieConsent
