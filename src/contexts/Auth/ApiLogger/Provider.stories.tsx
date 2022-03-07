import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { ButtonEx, useAsyncEffect } from '@xylabs/sdk-react'
import { XyoAuthApi } from '@xyo-network/sdk-xyo-client-js'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { ApiLogEntry } from './ApiLogEntry'
import { ApiErrorsProvider } from './Provider'
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

  const AuthApi = XyoAuthApi.get({
    apiDomain: 'http://localhost:8081',
  })

  useAsyncEffect(async () => {
    if (errorRefresh > 0) {
      try {
        await AuthApi.login({
          email: 'none@none.com',
          password: 'notarealpassword',
        })
      } catch (error) {
        setApiCalls((prev) => {
          prev.unshift(error as AxiosError)
          return [...prev]
        })
      }
    }
  }, [errorRefresh, setApiCalls])

  return (
    <>
      <ButtonEx marginY={2} variant="contained" onClick={() => setErrorRefresh(errorRefresh + 1)}>
        Fire off Error
      </ButtonEx>
      {calls.length > 0 && (
        <ul>
          {calls.map((call, index) => (
            <ApiLogEntry key={index} call={call} />
          ))}
        </ul>
      )}
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
