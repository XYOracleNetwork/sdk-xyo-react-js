import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/sdk-react'

import { Footer } from './Footer'

const StorybookEntry = {
  argTypes: {},
  component: Footer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Shared/Footer',
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => (
  <FlexCol minHeight="80vh" justifyContent="flex-end">
    <Footer {...args}></Footer>
  </FlexCol>
)

const Default = Template.bind({})
Default.args = {}

const DynamicHeight = Template.bind({})
DynamicHeight.args = { dynamicHeight: true }

export { Default, DynamicHeight }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
