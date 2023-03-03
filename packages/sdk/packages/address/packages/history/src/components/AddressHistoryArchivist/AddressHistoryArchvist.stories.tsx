import { ComponentStory, Meta } from '@storybook/react'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { useArchivist } from '@xyo-network/react-archivist'
import { TypographyEx } from '@xyo-network/react-shared'
import { BrowserRouter } from 'react-router-dom'

import { AddressHistoryArchivist } from './AddressHistoryArchivist'

const Result: React.FC = () => {
  const archivist = useArchivist()
  const wrapper = archivist ? new ArchivistWrapper(archivist) : undefined
  const results = wrapper?.all?.()
  return <code>{JSON.stringify(results, null, 2)}</code>
}

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistoryArchivist,
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
