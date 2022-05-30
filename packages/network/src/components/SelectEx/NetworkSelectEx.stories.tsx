import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/sdk-react'

import { authDecorator, authServiceList, WrappedArgs } from '../../../../../.storybook'
import { NetworkMemoryProvider } from '../../contexts'
import { NetworkSelectEx } from './NetworkSelectEx'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
        jwtToken: 'badToken',
        loggedInAccount: 'none@none.com',
      },
    },
  },
  component: NetworkSelectEx,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'network/NetworkSelectEx',
} as ComponentMeta<typeof NetworkSelectEx>

const Template: ComponentStory<typeof NetworkSelectEx> = (args) => {
  return <NetworkSelectEx {...args}></NetworkSelectEx>
}

const TemplateWithProvider: ComponentStory<typeof NetworkSelectEx> = (args) => {
  const combinedArgs = args as WrappedArgs & SelectExProps<string>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authState, ...props } = combinedArgs
  return (
    <NetworkMemoryProvider>
      <NetworkSelectEx {...props}></NetworkSelectEx>
    </NetworkMemoryProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithProvider = TemplateWithProvider.bind({})
WithProvider.args = {}

export { Default, WithProvider }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
