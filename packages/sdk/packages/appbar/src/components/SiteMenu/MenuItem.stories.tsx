import { List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SiteMenuListItem } from './MenuItems'

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

const Template: ComponentStory<typeof SiteMenuListItem> = (args) => {
  return (
    <List>
      <SiteMenuListItem {...args} />
    </List>
  )
}

const Default = Template.bind({})
Default.args = {
  primary: 'Test',
}

const WithChildren = Template.bind({})
WithChildren.args = {
  children: <SiteMenuListItem primary="Test Child" />,
  primary: 'Test',
}

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
