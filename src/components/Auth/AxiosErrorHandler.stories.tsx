import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ButtonEx, useAsyncEffect } from '@xylabs/sdk-react'
import { XyoAuthApi } from '@xyo-network/sdk-xyo-client-js'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { authServiceList } from '../../.storybook'
import { AuthProvider, DefaultState } from '../../contexts'
import { AxiosErrorHandler } from './AxiosErrorHandler'

const StorybookEntry = {
  argTypes: {},
  component: AxiosErrorHandler,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AxiosErrorHandler',
} as ComponentMeta<typeof AxiosErrorHandler>

const Template: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [errorRefresh, setErrorRefresh] = useState(0)
  const [apiError, setApiError] = useState<AxiosError>()

  const AuthApi = XyoAuthApi.get({
    apiDomain: 'http://localhost:8081',
    jwtToken: 'badToken',
  })

  useAsyncEffect(async () => {
    if (errorRefresh === 1) {
      try {
        await AuthApi.login({
          email: 'none@none.com',
          password: 'notarealpassword',
        })
      } catch (error) {
        setApiError(error as AxiosError)

        // increment to trigger a second call automatically
        setErrorRefresh(errorRefresh + 1)
      }
    } else if (errorRefresh > 1) {
      try {
        // Simulate Logout with no jwtToken Passed
        const AuthApiNoToken = XyoAuthApi.get({
          apiDomain: 'http://localhost:8081',
        })
        await AuthApiNoToken.login({
          email: 'none@none.com',
          password: 'notarealpassword',
        })
      } catch (error) {
        setApiError(error as AxiosError)
      }
    }
  }, [errorRefresh])

  return (
    <AuthProvider
      authState={{ ...DefaultState, ...{ authServiceList, jwtToken: 'badToken', loggedInAccount: 'none@none.com' } }}
    >
      <BrowserRouter>
        <ButtonEx variant="contained" onClick={() => setErrorRefresh(errorRefresh + 1)}>
          Fire off 401
        </ButtonEx>
        <AxiosErrorHandler apiError={apiError}>
          <p>I should only be visible when there is no error</p>
        </AxiosErrorHandler>
      </BrowserRouter>
    </AuthProvider>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
