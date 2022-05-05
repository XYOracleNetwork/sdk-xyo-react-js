import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ArchiveProvider } from '../../../archive'
import { ArchivesProvider } from '../../../archives'
import { ArchivistApiProvider } from '../../../archivist-api'
import { NetworkMemoryProvider } from '../../../network'
import { SearchBar } from '../SearchBar'
import { SystemToolbar } from '../Toolbar'
import { ApplicationAppBar } from './Application'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'AppBar/Application',
} as ComponentMeta<typeof ApplicationAppBar>

const Template: ComponentStory<typeof ApplicationAppBar> = (args) => (
  <BrowserRouter>
    <NetworkMemoryProvider>
      <ArchiveProvider>
        <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
          <ArchivesProvider>
            <ApplicationAppBar {...args}></ApplicationAppBar>
          </ArchivesProvider>
        </ArchivistApiProvider>
      </ArchiveProvider>
    </NetworkMemoryProvider>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithChildren = Template.bind({})
WithChildren.args = { children: <SearchBar flexGrow={1} />, color: 'primary', systemToolbar: <SystemToolbar darkModeButton authButton /> }

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
