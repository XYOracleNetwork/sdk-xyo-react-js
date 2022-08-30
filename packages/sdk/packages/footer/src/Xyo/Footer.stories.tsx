import { Paper } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'

import { XyoFooter } from './Footer'

const StorybookEntry = {
  argTypes: {},
  component: XyoFooter,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'footer/Footer',
} as ComponentMeta<typeof XyoFooter>

const Template: ComponentStory<typeof XyoFooter> = (args) => (
  <FlexCol minHeight="80vh" alignItems="stretch">
    <Paper style={{ alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>Test Content</Paper>
    <XyoFooter {...args} />
  </FlexCol>
)

const Default = Template.bind({})
Default.args = {}

const DynamicHeight = Template.bind({})
DynamicHeight.args = { dynamicHeight: true }

export { Default, DynamicHeight }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
