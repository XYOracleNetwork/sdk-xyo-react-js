import { NotFound } from '@xyo-network/react-shared'
import React from 'react'

import type { WebAppPageProps } from '../Page.tsx'
import { WebAppPage } from '../Page.tsx'

export const WebAppNotFoundPage: React.FC<WebAppPageProps> = ({ title, ...props }) => (
  <WebAppPage title={title ?? 'Sorry! Page Not Found'} {...props}>
    <NotFound />
  </WebAppPage>
)

/** @deprecated  use WebAppNotFoundPage instead */
export const NotFoundPage = WebAppNotFoundPage
