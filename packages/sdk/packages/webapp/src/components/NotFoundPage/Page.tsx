import { NotFound } from '@xyo-network/react-shared'

import { WebAppPage, WebAppPageProps } from '../Page'

export const WebAppNotFoundPage: React.FC<WebAppPageProps> = ({ title, ...props }) => (
  <WebAppPage title={title ?? 'Sorry! Page Not Found'} {...props}>
    <NotFound />
  </WebAppPage>
)

/** @deprecated  use WebAppNotFoundPage instead */
export const NotFoundPage = WebAppNotFoundPage
