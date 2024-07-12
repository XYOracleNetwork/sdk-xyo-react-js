import { ButtonEx } from '@xylabs/react-button'

import { WebAppPage, WebAppPageProps } from './Page.js'

export interface WebAppErrorPageProps extends WebAppPageProps {
  error?: Error
}

export const WebAppErrorPage: React.FC<WebAppErrorPageProps> = ({ error, ...props }) => (
  <WebAppPage title="Oops! Something went wrong" {...props}>
    <h1>Oops! Something went wrong!</h1>
    <p>{`${error}`}</p>
    <ButtonEx href="/" variant="contained">
      Homepage
    </ButtonEx>
  </WebAppPage>
)

/** @deprecated use WebAppErrorPage instead */
export const ErrorPage = WebAppErrorPage
