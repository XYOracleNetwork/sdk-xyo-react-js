/* eslint-disable import/no-internal-modules */
import { List } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { TypographyEx } from '@xyo-network/react-shared'
import { SyntheticEvent } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { MenuListItemContainer } from '../../SiteMenu/index.js'
import { SystemToolbar } from './SystemToolbar.js'

const DefaultMenu = (
  <List>
    <MenuListItemContainer primary="Hello" />
    <MenuListItemContainer
      primary="Click and Keep Open"
      onClick={(event: SyntheticEvent) => {
        event.stopPropagation()
      }}
    />
  </List>
)

const StorybookEntry: Meta = {
  component: SystemToolbar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/Toolbar/System',
}

const Template: StoryFn<typeof SystemToolbar> = (args) => (
  <BrowserRouter>
    <NetworkMemoryProvider>
      <SystemToolbar {...args} />
    </NetworkMemoryProvider>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const PrecedingChildren = Template.bind({})
PrecedingChildren.args = {
  precedingChildren: (
    <TypographyEx variant="body1" mx={0.5}>
      Preceding Child Component
    </TypographyEx>
  ),
}

const WithOnMenuToggle = Template.bind({})
WithOnMenuToggle.args = {
  menuItems: DefaultMenu,
  onMenuToggle: (state) => console.log(state),
}

export { Default, PrecedingChildren, WithOnMenuToggle }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
