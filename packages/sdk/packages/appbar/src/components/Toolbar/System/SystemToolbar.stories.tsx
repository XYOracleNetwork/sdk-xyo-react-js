import { List, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { MenuListItemContainer } from '@xylabs/react-appbar'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import type { SyntheticEvent } from 'react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { XyoSystemToolbar } from './SystemToolbar.tsx'

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
  component: XyoSystemToolbar,
  parameters: { docs: { page: null } },
  title: 'appbar/Toolbar/System',
}

const Template: StoryFn<typeof XyoSystemToolbar> = args => (
  <BrowserRouter>
    <NetworkMemoryProvider>
      <XyoSystemToolbar {...args} />
    </NetworkMemoryProvider>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const PrecedingChildren = Template.bind({})
PrecedingChildren.args = {
  precedingChildren: (
    <Typography variant="body1" mx={0.5}>
      Preceding Child Component
    </Typography>
  ),
}

const WithOnMenuToggle = Template.bind({})
WithOnMenuToggle.args = {
  menuItems: DefaultMenu,
  onMenuToggle: state => console.log(state),
}

export {
  Default, PrecedingChildren, WithOnMenuToggle,
}

export default StorybookEntry
