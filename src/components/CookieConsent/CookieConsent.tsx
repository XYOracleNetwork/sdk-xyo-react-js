import { useCookieConsent } from '../../contexts'
import CookieConsentBody from './CookieConsentBody'
import CookieConsentProps from './CookieConsentProps'

const CookieConsent: React.FC<CookieConsentProps> = (props) => {
  const { accepted } = useCookieConsent()

  return accepted ? null : (
    <CookieConsentBody background position="fixed" bottom={0} width="100vw" zIndex={1000} {...props} />
  )
}

export default CookieConsent
