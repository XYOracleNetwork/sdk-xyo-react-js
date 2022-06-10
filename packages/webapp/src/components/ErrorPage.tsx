import { ButtonEx } from '@xylabs/react-button'

import { WebAppPage } from './Page'

export const WebAppErrorPage = () => (
  <WebAppPage title="Oops! Something went wrong">
    <h1>Oops! Something went wrong!</h1>
    <ButtonEx href="/" variant="contained">
      Homepage
    </ButtonEx>
  </WebAppPage>
)

/** @deprecated use WebAppErrorPage instead */
export const ErrorPage = WebAppErrorPage
