import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/sdk-react'

import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { authDecorator, authServiceList, WrappedArgs } from './authHelpers'
import { SchemaMemoryProvider } from '../../packages/schema/src/contexts'
import { SchemaSelectEx } from '../../packages/schema/src/components/SelectEx/SchemaSelectEx'

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
  component: SchemaSelectEx,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'schema/SchemaSelectEx',
} as ComponentMeta<typeof SchemaSelectEx>

const Template: ComponentStory<typeof SchemaSelectEx> = (args) => {
  return <SchemaSelectEx {...args}></SchemaSelectEx>
}

const TemplateWithProvider: ComponentStory<typeof SchemaSelectEx> = (args) => {
  const combinedArgs = args as WrappedArgs & SelectExProps<string>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authState, ...props } = combinedArgs
  return (
    <SchemaMemoryProvider knownSchemaList={['network.xyo.schema', 'network.xyo.domain']}>
      <SchemaSelectEx {...props}></SchemaSelectEx>
    </SchemaMemoryProvider>
  )
}

const TemplateWithApi: ComponentStory<typeof SchemaSelectEx> = (args) => {
  const combinedArgs = args as WrappedArgs & SelectExProps<string>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authState, ...props } = combinedArgs
  return (
    <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <SchemaMemoryProvider>
        <SchemaSelectEx {...props}></SchemaSelectEx>
      </SchemaMemoryProvider>
    </ArchivistApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithProvider = TemplateWithProvider.bind({})
WithProvider.args = {}

const WithApi = TemplateWithApi.bind({})
WithApi.args = {}

export { Default, WithApi, WithProvider }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
