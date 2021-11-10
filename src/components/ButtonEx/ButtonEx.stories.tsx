import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { FlexCol, FlexRow } from '../FlexBox'
import ButtonEx from './ButtonEx'

const StorybookEntry = {
  argTypes: {},
  component: ButtonEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ButtonEx',
} as ComponentMeta<typeof ButtonEx>

const DefaultTemplate: ComponentStory<typeof ButtonEx> = (args) => (
  <FlexRow justifyContent="flex-start">
    <FlexCol marginX={1}>
      <ButtonEx {...args}>Default</ButtonEx>
    </FlexCol>
    <FlexCol marginX={1}>
      <ButtonEx variant="outlined" {...args}>
        Outlined
      </ButtonEx>
    </FlexCol>
    <FlexCol marginX={1}>
      <ButtonEx variant="contained" {...args}>
        Contained
      </ButtonEx>
    </FlexCol>
  </FlexRow>
)

const Default = DefaultTemplate.bind({})
Default.args = {}

const BusyCircular = DefaultTemplate.bind({})
BusyCircular.args = { busy: true, busyVariant: 'circular' }

const BusyLinear = DefaultTemplate.bind({})
BusyLinear.args = { busy: true, busyVariant: 'linear' }

export { BusyCircular, BusyLinear, Default }
export default StorybookEntry
