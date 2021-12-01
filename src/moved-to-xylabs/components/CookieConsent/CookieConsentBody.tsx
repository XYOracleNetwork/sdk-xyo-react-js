/* eslint-disable @delagen/deprecation/deprecation */
import { Link, Typography } from '@mui/material'
import { useEffect } from 'react'

import { useCookieConsent } from '../../contexts'
import { ButtonEx } from '../ButtonEx'
import { FlexRow } from '../FlexBox'
import CookieConsentProps from './CookieConsentProps'

/** @deprecated Moved to @xylabs/sdk-react */
const CookieConsentBody: React.FC<CookieConsentProps> = ({ acceptOnScroll, acceptOnTimer = 0, onAccept, ...props }) => {
  const { accepted, setAccepted, storageName } = useCookieConsent()

  const onScroll = () => {
    //hide it one the user has scrolled at least one page
    if (window.scrollY > window.innerHeight && !accepted) {
      onAcceptClick()
    }
  }

  useEffect(() => {
    if (acceptOnScroll) {
      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }
  })

  const onAcceptClick = () => {
    if (setAccepted) {
      setAccepted?.(true)
    } else {
      localStorage.setItem(storageName ?? 'CookiesAccepted', 'true')
    }
    onAccept?.(true)
  }

  if (acceptOnTimer > 0 && !accepted) {
    setTimeout(() => {
      onAcceptClick()
    }, acceptOnTimer)
  }

  if (!storageName) {
    return (
      <FlexRow justifyContent="center" paddingY={2} {...props}>
        <Typography color="error" variant="body1">
          Missing CookieConsentContext
        </Typography>
      </FlexRow>
    )
  }

  return accepted ? null : (
    <FlexRow justifyContent="space-between" {...props}>
      <Typography variant="body2" margin={2}>
        {'This site uses '}
        <Link href="https://cookiesandyou.com/" rel="noopener noreferrer" target="_blank">
          cookies
        </Link>
        {' and '}
        <Link href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
          Google&nbsp;tools
        </Link>
        {' to analyze traffic and for ads measurement purposes.'}
      </Typography>
      <ButtonEx variant="contained" color="secondary" onClick={onAcceptClick} margin={2}>
        Accept
      </ButtonEx>
    </FlexRow>
  )
}

export default CookieConsentBody
