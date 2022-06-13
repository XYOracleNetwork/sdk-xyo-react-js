import { Card, CardContent } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/react-common'
import { FlexCol } from '@xylabs/react-flexbox'

import { authDecorator, WrappedArgs } from '../../../../../.storybook'
import { NetworkMemoryProvider, useNetwork } from '../../contexts'
import { NetworkSelectEx } from './NetworkSelectEx'

const StorybookEntry = {
  argTypes: {},
  component: NetworkSelectEx,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'network/NetworkSelectEx',
} as ComponentMeta<typeof NetworkSelectEx>

const NetworkConfigOutput = () => {
  const { network } = useNetwork()
  return (
    <FlexCol my={2}>
      <Card>
        <CardContent>
          <pre>{JSON.stringify(network, null, 2)}</pre>
        </CardContent>
      </Card>
    </FlexCol>
  )
}

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
      <NetworkConfigOutput />
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
