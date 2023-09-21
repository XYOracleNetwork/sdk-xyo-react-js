import { List } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FaGlobeAmericas } from 'react-icons/fa/index'
import { BrowserRouter } from 'react-router-dom'

import { MenuListItemContainer, MenuListItemProps } from './MenuListItemContainer'

const StorybookEntry = {
  argTypes: {},
  component: MenuListItemContainer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/MenuListItemContainer',
} as Meta<typeof MenuListItemContainer>

const SiteMenuList: React.FC<MenuListItemProps> = (args) => {
  return (
    <BrowserRouter>
      <List>
        <MenuListItemContainer {...args} />
        <MenuListItemContainer {...args} />
        <MenuListItemContainer {...args} />
      </List>
    </BrowserRouter>
  )
}

const Template: StoryFn<typeof MenuListItemContainer> = (args) => {
  return <SiteMenuList {...args} />
}

const Default = Template.bind({})
Default.args = {
  dense: true,
  icon: <FaGlobeAmericas />,
  primary: 'Explore',
  tooltip: 'View global archivist data on a world map.',
}

const WithChildren = Template.bind({})
WithChildren.args = {
  icon: <FaGlobeAmericas />,
  primary: 'Explore',
  subNavListItems: [{ primary: 'Explore', to: '/explore', tooltip: 'View global archivist data on a world map.' }],
  tooltip: 'View global archivist data on a world map.',
}

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
