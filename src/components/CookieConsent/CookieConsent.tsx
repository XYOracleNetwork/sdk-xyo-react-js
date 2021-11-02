import { CookieConsentLoader, useCookieConsent } from '../../contexts'
import CookieConsentBody from './CookieConsentBody'
import CookieConsentProps from './CookieConsentProps'

const CookieConsent: React.FC<CookieConsentProps> = (props) => {
  const { storageName } = useCookieConsent()

  const Inner: React.FC = () => {
    const { accepted } = useCookieConsent()
    return accepted ? null : (
      <CookieConsentBody background paper position="fixed" bottom={0} width="100vw" zIndex={1000} {...props} />
    )
  }

  //if not inside a context, make a context
  if (!storageName) {
    return (
      <CookieConsentLoader>
        <Inner />
      </CookieConsentLoader>
    )
  }

  return <Inner />
}

export default CookieConsent
