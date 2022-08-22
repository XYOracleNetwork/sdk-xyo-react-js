import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { locationRangeAnswerPayload } from './payload.stories'
import { PointsMapRenderer } from './PointsMapRenderer'

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {
    minHeight: {
      // calc used to account for the offset provided by storybook wrapper
      defaultValue: 'calc(100vh - 2rem)',
    },
  },
  component: PointsMapRenderer,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/points-map/PointsMap',
} as Meta

const Template: ComponentStory<typeof PointsMapRenderer> = (args) => {
  return <PointsMapRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: locationRangeAnswerPayload,
}

export { Default, WithData }
