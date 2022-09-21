import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import { List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

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
  icon: <PublicRoundedIcon />,
  primary: 'Test',
}

const WithChildren = Template.bind({})
WithChildren.args = {
  children: (
    <List>
      <SiteMenuListItem primary="Test Child" icon={<PublicRoundedIcon />} />
    </List>
  ),
  icon: <PublicRoundedIcon />,
  primary: 'Test',
}

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
