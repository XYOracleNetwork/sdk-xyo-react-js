import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'
import { useArchivist } from '@xyo-network/react-archivist'
import { MemoryNodeProvider, useAddNamedModules } from '@xyo-network/react-node'
import { TypographyEx } from '@xyo-network/react-shared'
import { BrowserRouter } from 'react-router-dom'

import { AddressHistoryArchivist } from './AddressHistoryArchivist'

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <Story {...args} />
  </MemoryNodeProvider>
)

const AddModulesDecorator: DecoratorFn = (Story, args) => {
  const list = { AddressHistoryDiviner: Symbol('AddressHistoryDiviner') }
  useAddNamedModules(list, { apiDomain: 'http://localhost:8080' })
  return <Story {...args} />
}

const Result: React.FC = () => {
  const { archivist } = useArchivist()
  const results = archivist?.all()
  return <code>{JSON.stringify(results, null, 2)}</code>
}

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistoryArchivist,
  decorators: [AddModulesDecorator, MemoryNodeDecorator],
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
