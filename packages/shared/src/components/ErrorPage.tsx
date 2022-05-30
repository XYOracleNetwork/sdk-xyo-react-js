import { ButtonEx } from '@xylabs/sdk-react'

import { FlexPage } from './FlexPage'

export const ErrorPage = () => (
  <FlexPage title="Oops! Something went wrong">
    <h1>Oops! Something went wrong!</h1>
    <ButtonEx href="/" variant="contained">
      Homepage
    </ButtonEx>
  </FlexPage>
)
