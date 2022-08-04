import { ComponentMeta, ComponentStory } from '@storybook/react'

import { payloadData } from './payloadData.stories'
import { UniswapDetailsRender } from './UniswapDetailsRender'

const StorybookEntry = {
  argTypes: {},
  component: UniswapDetailsRender,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/UniswapDetailsRender',
} as ComponentMeta<typeof UniswapDetailsRender>

const Template: ComponentStory<typeof UniswapDetailsRender> = (args) => <UniswapDetailsRender {...args}></UniswapDetailsRender>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
