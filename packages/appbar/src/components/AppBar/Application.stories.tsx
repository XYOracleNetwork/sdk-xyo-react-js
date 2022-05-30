/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ArchiveProvider, ArchivesProvider } from '../../../../archive/src'
import { ArchivistApiProvider } from '../../../../archivist-api/src'
import { NetworkMemoryProvider } from '../../../../network/src'
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
  title: 'appbar/AppBar/Application',
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

const WithSearchBar = Template.bind({})
WithSearchBar.args = { children: <SearchBar flexGrow={1} onSearch={(term) => alert(term)} />, color: 'primary', systemToolbar: <SystemToolbar darkModeButton authButton /> }

export { Default, WithSearchBar }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
