import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import { Divider, List, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'

import { CollapsibleProvider, useCollapsible } from '../../contexts'
import { SiteMenuListItem, SiteMenuListItemProps } from '../SiteMenu'
import { CollapseToggleFlex } from './CollapseToggle'
import { CollapsibleDrawer } from './CollapsibleDrawer'

const CollapseProviderDecorator: DecoratorFn = (Story, args) => {
  return (
    <CollapsibleProvider>
      <Story {...args} />
    </CollapsibleProvider>
  )
}

const StorybookEntry = {
  argTypes: {},
  component: CollapsibleDrawer,
  decorators: [CollapseProviderDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/CollapseDrawer',
} as ComponentMeta<typeof CollapsibleDrawer>

const SiteMenuList: React.FC<SiteMenuListItemProps> = (args) => {
  return (
    <List>
      <SiteMenuListItem {...args} />
      <SiteMenuListItem {...args} />
      <SiteMenuListItem {...args} />
    </List>
  )
}

const Template: ComponentStory<typeof CollapsibleDrawer> = (args) => {
  const { collapse, setCollapseEnd, collapseEnd } = useCollapsible()
  const theme = useTheme()
  return (
    <>
      <FlexGrowCol alignItems="start" height="calc(100vh - 2rem)">
        <CollapsibleDrawer in={!collapse} orientation="horizontal" collapsedSize={theme.spacing(5)} onExited={() => setCollapseEnd?.(true)} {...args}>
          <SiteMenuList iconOnly={collapse} collapseEnd={collapseEnd} primary="test" icon={<PublicRoundedIcon />} />
          <FlexGrowCol />
          <CollapseToggleFlex justifyContent="start" />
        </CollapsibleDrawer>
        <Divider orientation="vertical" flexItem />
      </FlexGrowCol>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
