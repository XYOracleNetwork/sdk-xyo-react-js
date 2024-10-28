import { Divider, useTheme } from '@mui/material'
import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react'
import { MenuSection } from '@xylabs/react-appbar'
import {
  FlexCol, FlexGrowCol, FlexRow,
} from '@xylabs/react-flexbox'
import { CollapsibleProvider, useCollapsible } from '@xylabs/react-shared'
import React from 'react'

import { CollapseToggleFlex } from './CollapseToggle.tsx'
import { CollapsibleDrawer } from './CollapsibleDrawer.tsx'
import { menuDataBottom, menuDataTop } from './storyExampleMenuData.tsx'

const CollapseProviderDecorator: Decorator = (Story, args) => {
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
  parameters: { docs: { page: null } },
  title: 'appbar/CollapseDrawer',
} as Meta<typeof CollapsibleDrawer>

const Template: StoryFn<typeof CollapsibleDrawer> = (args) => {
  const { collapse, setCollapseEnd } = useCollapsible()
  const theme = useTheme()
  return (
    <FlexRow justifyContent="start">
      <FlexCol alignItems="start">
        <CollapsibleDrawer in={!collapse} orientation="horizontal" collapsedSize={theme.spacing(5)} onExited={() => setCollapseEnd?.(true)} {...args}>
          <MenuSection title="Explore & Create" listItems={menuDataTop} showTitle={!collapse} />
          <MenuSection title="Settings & Analytics" listItems={menuDataBottom} showTitle={!collapse} />
          <FlexGrowCol height="100%" />
          <CollapseToggleFlex />
        </CollapsibleDrawer>
      </FlexCol>
      <Divider flexItem orientation="vertical" />
    </FlexRow>
  )
}

const Default = Template.bind({})
Default.args = { collapsedSize: '40px' }

export { Default }

export default StorybookEntry
