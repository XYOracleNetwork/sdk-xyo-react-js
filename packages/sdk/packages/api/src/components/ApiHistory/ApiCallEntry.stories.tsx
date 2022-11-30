import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoApiResponse } from '@xyo-network/api-models'

import { ApiCallEntry } from './ApiCallEntry'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: ApiCallEntry,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist-api/ApiHistory/ApiCallEntry',
} as ComponentMeta<typeof ApiCallEntry>

const Template: ComponentStory<typeof ApiCallEntry> = ({ ...props }) => {
  return <ApiCallEntry {...props} />
}

const Default = Template.bind({})
Default.args = {
  call: {
    code: 400,
    config: {
      method: 'post',
      url: 'https://some400.com',
    },
    isXyoError: true,
    message: 'Bad Request',
  } as unknown as XyoApiResponse,
  index: 1,
}

const Success = Template.bind({})
Success.args = {
  call: {
    config: {
      method: 'post',
      url: 'https://some200.com',
    },
    isXyoError: false,
    status: 200,
    statusText: 'Success',
  } as unknown as XyoApiResponse,
  index: 2,
}

export { Default, Success }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
