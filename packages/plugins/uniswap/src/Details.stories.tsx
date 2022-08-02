import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'

import { UniswapDetailsRender } from './components'
import { DetailsBox } from './Details'
import { payloadData } from './payloadData'
import { UniswapPairsRenderPlugin } from './Plugin'

const StorybookEntry = {
  argTypes: {},
  component: DetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap',
} as ComponentMeta<typeof DetailsBox>

const Template: ComponentStory<typeof DetailsBox> = (args) => (
  <FlexCol minHeight="80vh" justifyContent="flex-end">
    <UniswapDetailsRender {...args}></UniswapDetailsRender>
  </FlexCol>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
