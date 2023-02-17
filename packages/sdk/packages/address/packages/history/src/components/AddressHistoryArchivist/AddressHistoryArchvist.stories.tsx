import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { RemoteModuleResolver } from '@xyo-network/http-proxy-module'
import { NodeConfigSchema } from '@xyo-network/node'
import { useArchivist } from '@xyo-network/react-archivist'
import { MemoryNodeProvider, ModuleRepositoryProvider, useModuleRepository } from '@xyo-network/react-node'
import { TypographyEx } from '@xyo-network/react-shared'
import { BrowserRouter } from 'react-router-dom'

import { AddressHistoryArchivist } from './AddressHistoryArchivist'

const apiConfig = { apiDomain: 'http://localhost:8080' }

const ModuleRepositoryDecorator: DecoratorFn = (Story, args) => {
  return (
    <ModuleRepositoryProvider defaultResolvers={{ beta: new RemoteModuleResolver(apiConfig) }}>
      <Story {...args} />
    </ModuleRepositoryProvider>
  )
}

const MemoryNodeResolverDecorator: DecoratorFn = (Story, args) => {
  const { resolvers } = useModuleRepository(true)
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }} resolver={resolvers?.beta}>
      <Story {...args} />
    </MemoryNodeProvider>
  )
}

const Result: React.FC = () => {
  const { archivist } = useArchivist()
  const wrapper = archivist ? new ArchivistWrapper(archivist) : undefined
  const results = wrapper?.all?.()
  return <code>{JSON.stringify(results, null, 2)}</code>
}

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistoryArchivist,
  decorators: [MemoryNodeResolverDecorator, ModuleRepositoryDecorator],
  title: 'address/history/Archivist',
} as Meta

const Template: ComponentStory<typeof AddressHistoryArchivist> = (args) => {
  return (
    <BrowserRouter>
      <AddressHistoryArchivist {...args}>
        <TypographyEx>Successfully fetched history</TypographyEx>
        <Result />
      </AddressHistoryArchivist>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = {
  address: 'ee2b7e0bc65ed562fba1b700363fb7ae9667b8a6',
}

export { Default, WithAddress }
