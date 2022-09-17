import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import { Button, Collapse, Divider, List, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

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

const CollapseTemplate: ComponentStory<typeof SiteMenuListItem> = (args) => {
  const [collapse, setCollapse] = useState(false)
  const [onCollapseEnd, setOnCollapseEnd] = useState(false)
  const theme = useTheme()
  return (
    <>
      <FlexRow justifyContent="start">
        <Collapse in={!collapse} orientation="horizontal" collapsedSize={theme.spacing(5)} onExited={() => setOnCollapseEnd(true)}>
          <SiteMenuList {...args} iconOnly={collapse} collapseEnd={onCollapseEnd} />
        </Collapse>
        <Divider orientation="vertical" flexItem />
      </FlexRow>
      <Button
        onClick={() => {
          setOnCollapseEnd((previous) => (previous ? false : previous))
          setCollapse(!collapse)
        }}
      >
        Toggle
      </Button>
    </>
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

const WithCollapse = CollapseTemplate.bind({})
WithCollapse.args = {
  dense: true,
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

export { Default, WithChildren, WithCollapse }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
