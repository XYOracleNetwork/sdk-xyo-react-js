import { List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FaGlobeAmericas } from 'react-icons/fa'

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
} as ComponentMeta<typeof MenuListItemContainer>

const SiteMenuList: React.FC<MenuListItemProps> = (args) => {
  return (
    <List>
      <MenuListItemContainer {...args} />
      <MenuListItemContainer {...args} />
      <MenuListItemContainer {...args} />
    </List>
  )
}

const Template: ComponentStory<typeof MenuListItemContainer> = (args) => {
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
