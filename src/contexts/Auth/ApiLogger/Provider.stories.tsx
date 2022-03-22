import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { ButtonEx, useAsyncEffect } from '@xylabs/sdk-react'
import { XyoAuthApi } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { ApiLogs } from '../../../components'
import { ApiErrorsProvider } from './Provider'
import { useApiCaller } from './useApiCaller'
import { useApiLogger } from './useApiLogger'

const ContextDecorator: DecoratorFn = (Story, { args }) => (
  <ApiErrorsProvider>
    <Story {...args} />
  </ApiErrorsProvider>
)

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'http://localhost:8081',
    },
  },
  component: ApiErrorsProvider,
  decorators: [ContextDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/ApiErrors',
} as ComponentMeta<typeof ApiErrorsProvider>

const Template: ComponentStory<typeof ApiErrorsProvider> = () => {
  const { calls, setApiCalls } = useApiLogger()
  const [errorRefresh, setErrorRefresh] = useState(0)
  const { invoke } = useApiCaller()

  const AuthApi = XyoAuthApi.get({
    apiDomain: 'http://localhost:8081',
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    if (errorRefresh > 0) {
      try {
        await invoke({
          call: () =>
            AuthApi.login({
              email: 'none@none.com',
              password: 'notarealpassword',
            }),
        })
      } catch (error) {
        console.error(error)
      }
    }
  }, [errorRefresh, setApiCalls, AuthApi, invoke])

  return (
    <>
      <ButtonEx marginY={2} variant="contained" onClick={() => setErrorRefresh(errorRefresh + 1)}>
        Fire off Error
      </ButtonEx>
      <ApiLogs calls={calls} />
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
