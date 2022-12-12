import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { locationPayload } from './payload.stories'
import { PointMapRenderer } from './PointMapRenderer'

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {
    minHeight: {
      // calc used to account for the offset provided by storybook wrapper
      defaultValue: 'calc(100vh - 2rem)',
    },
  },
  component: PointMapRenderer,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/point-map/PointMap',
} as Meta

const Template: ComponentStory<typeof PointMapRenderer> = (args) => {
  return <PointMapRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: locationPayload,
}

const missingData = {
  result: {
    features: [],
  },
  schema: 'network.xyo.location',
}

const WithNoData = Template.bind({})
WithNoData.args = {
  payload: missingData,
}

export { Default, WithData, WithNoData }
