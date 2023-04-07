import { Divider, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'

import { CollapsibleProvider, useCollapsible } from '../../contexts'
import { MenuSection } from '../SiteMenu'
import { CollapseToggleFlex } from './CollapseToggle'
import { CollapsibleDrawer } from './CollapsibleDrawer'
import { menuDataBottom, menuDataTop } from './storyExampleMenuData'

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

const Template: ComponentStory<typeof CollapsibleDrawer> = (args) => {
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
      <Divider flexItem orientation={'vertical'} />
    </FlexRow>
  )
}

const Default = Template.bind({})
Default.args = {
  collapsedSize: '40px',
}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
