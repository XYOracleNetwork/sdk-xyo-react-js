import { Link, Typography } from '@mui/material'
import { useEffect } from 'react'

import { useCookieConsent } from '../../contexts'
import { ButtonEx } from '../ButtonEx'
import { FlexRow } from '../FlexBox'
import CookieConsentProps from './CookieConsentProps'

const CookieConsentBody: React.FC<CookieConsentProps> = ({ acceptOnScroll, acceptOnTimer, onAccept, ...props }) => {
  const { accepted, setAccepted, storageName } = useCookieConsent()

  const onScroll = () => {
    //hide it one the user has scrolled at least one page
    if (window.scrollY > window.innerHeight && !accepted) {
      onAcceptClick()
    }
  }

  if (acceptOnTimer && !accepted) {
    setTimeout(() => {
      onAcceptClick()
    }, acceptOnTimer)
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
      console.log('onAcceptClick1')
      setAccepted?.(true)
    } else {
      console.log(`onAcceptClick2: ${storageName}`)
      localStorage.setItem(storageName ?? 'CookiesAccepted', 'true')
    }
    onAccept?.(true)
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
    <FlexRow justifyContent="space-between" paddingY={2} {...props}>
      <FlexRow>
        <Typography variant="body2">
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
      </FlexRow>
      <ButtonEx variant="contained" color="secondary" marginX={2} onClick={onAcceptClick}>
        Accept
      </ButtonEx>
    </FlexRow>
  )
}

export default CookieConsentBody
