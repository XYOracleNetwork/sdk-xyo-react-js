import { ButtonEx } from '@xylabs/react-button'
import React from 'react'

import type { WebAppPageProps } from './Page.tsx'
import { WebAppPage } from './Page.tsx'

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
