import { NotFound } from '@xyo-network/react-shared'
import React from 'react'

import { WebAppPage, WebAppPageProps } from '../Page.js'

export const WebAppNotFoundPage: React.FC<WebAppPageProps> = ({ title, ...props }) => (
  <WebAppPage title={title ?? 'Sorry! Page Not Found'} {...props}>
    <NotFound />
  </WebAppPage>
)

/** @deprecated  use WebAppNotFoundPage instead */
export const NotFoundPage = WebAppNotFoundPage
