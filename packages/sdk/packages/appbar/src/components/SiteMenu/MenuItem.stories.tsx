import { List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FaGlobeAmericas } from 'react-icons/fa'

import { SiteMenuListItem, SiteMenuListItemProps } from './MenuItems'

const StorybookEntry = {
  argTypes: {},
  component: SiteMenuListItem,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/SiteMenuListItem',
} as ComponentMeta<typeof SiteMenuListItem>

const SiteMenuList: React.FC<SiteMenuListItemProps> = (args) => {
  return (
    <List>
      <SiteMenuListItem {...args} />
      <SiteMenuListItem {...args} />
      <SiteMenuListItem {...args} />
    </List>
  )
}

const Template: ComponentStory<typeof SiteMenuListItem> = (args) => {
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
