import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AxiosError } from 'axios'
import { BrowserRouter } from 'react-router-dom'

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

const Template: ComponentStory<typeof AxiosErrorHandler> = (args) => {
  return (
    <BrowserRouter>
      <AxiosErrorHandler {...args}>
        <p>I should only be visible when there is no error</p>
      </AxiosErrorHandler>
    </BrowserRouter>
  )
}

const fakeAxios403Error = {
  message: 'Request failed with a 403 Forbidden',
  response: {
    status: 403,
    statusText: '403 Forbidden',
  },
} as unknown as AxiosError

const fakeAxios401Error = {
  config: {
    headers: {
      Authorization: 'Bearer someToken',
    },
  },
  message: 'Request failed with a 401 Forbidden',
  response: {
    status: 401,
    statusText: '401 Forbidden',
  },
} as unknown as AxiosError

const Default = Template.bind({})
Default.args = {
  apiError: fakeAxios403Error,
}

const With401 = Template.bind({})
With401.args = {
  apiError: fakeAxios401Error,
}
const WithNoError = Template.bind({})
WithNoError.args = {
  apiError: undefined,
}

export { Default, With401, WithNoError }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
