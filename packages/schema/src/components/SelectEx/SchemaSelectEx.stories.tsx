/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/sdk-react'

import { authDecorator, WrappedArgs } from '../../../../../.storybook'
import { ArchivistApiProvider } from '../../../../archivist-api/src'
import { SchemaMemoryProvider } from '../../contexts'
import { SchemaSelectEx } from './SchemaSelectEx'

const StorybookEntry = {
  argTypes: {},
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
