import { BoxProps, Link, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import Background from './Background'
import { ButtonEx } from './ButtonEx'
import { FlexRow } from './FlexBox'

interface Props extends BoxProps {
  hideOnScroll?: boolean
}

const CookieConsent: React.FC<Props> = (props) => {
  const { hideOnScroll } = props
  const [accepted, setAccepted] = useState(localStorage.getItem('CookiesAccepted') === 'true')

  const [showCookieConsent, setShowCookieConsent] = useState(true)

  const onScroll = () => {
    if (showCookieConsent) {
      setShowCookieConsent(false)
    }
  }

  useEffect(() => {
    if (hideOnScroll) {
      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }
  })

  const onAcceptClick = () => {
    localStorage.setItem('CookiesAccepted', 'true')
    setAccepted(true)
  }

  const show = !accepted && showCookieConsent

  return show ? (
    <Background
      display="flex"
      position="fixed"
      justifyContent="space-between"
      paddingY={2}
      bottom={0}
      width="100vw"
      zIndex={1000}
      {...props}
    >
      <FlexRow marginX={2}>
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
      </FlexRow>
      <ButtonEx variant="contained" color="secondary" marginX={2} onClick={onAcceptClick}>
        Accept
      </ButtonEx>
    </Background>
  ) : null
}

export default CookieConsent
