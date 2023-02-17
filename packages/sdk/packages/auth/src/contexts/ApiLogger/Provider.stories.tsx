/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { Alert, AlertTitle } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { ButtonEx } from '@xylabs/react-button'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistApi } from '@xyo-network/api'
import { useState } from 'react'

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
  const { setApiCalls } = useApiLogger()
  const [errorRefresh, setErrorRefresh] = useState(0)
  const { invoke } = useApiCaller()

  const userApi = new XyoArchivistApi({
    apiDomain: 'http://localhost:8081',
  }).user

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    if (errorRefresh > 0) {
      try {
        await invoke({
          call: () =>
            userApi.login.post({
              email: 'none@none.com',
              password: 'notarealpassword',
            }),
        })
      } catch (error) {
        console.error(error)
      }
    }
  }, [errorRefresh, setApiCalls, invoke, userApi])

  return (
    <>
      <Alert severity="error" sx={{ marginBottom: '24px' }}>
        <AlertTitle>Story has been Deprecated</AlertTitle>
      </Alert>
      <ButtonEx marginY={2} variant="contained" onClick={() => setErrorRefresh(errorRefresh + 1)}>
        Fire off Error
      </ButtonEx>
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
