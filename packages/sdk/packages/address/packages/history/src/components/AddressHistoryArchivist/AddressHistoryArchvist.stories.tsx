import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { RemoteModuleResolver } from '@xyo-network/http-proxy-module'
import { NodeConfigSchema } from '@xyo-network/node'
import { useArchivist } from '@xyo-network/react-archivist'
import { MemoryNodeProvider } from '@xyo-network/react-node'
import { TypographyEx } from '@xyo-network/react-shared'
import { BrowserRouter } from 'react-router-dom'

import { AddressHistoryArchivist } from './AddressHistoryArchivist'

const apiConfig = { apiDomain: 'http://localhost:8080' }

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }} resolver={new RemoteModuleResolver(apiConfig)}>
    <Story {...args} />
  </MemoryNodeProvider>
)

const Result: React.FC = () => {
  const { archivist } = useArchivist()
  const results = archivist?.all()
  return <code>{JSON.stringify(results, null, 2)}</code>
}

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistoryArchivist,
  decorators: [MemoryNodeDecorator],
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
