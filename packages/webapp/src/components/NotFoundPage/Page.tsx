import { WebAppPage, WebAppPageProps } from '../Page'
import { NotFound } from './NotFound'

export const WebAppNotFoundPage: React.FC<WebAppPageProps> = ({ title, ...props }) => (
  <WebAppPage title={title ?? 'Sorry! Page Not Found'} {...props}>
    <NotFound />
  </WebAppPage>
)

/** @deprecated  use WebAppNotFoundPage instead */
export const NotFoundPage = WebAppNotFoundPage
