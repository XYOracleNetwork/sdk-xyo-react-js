import { Decorator, Meta, StoryFn } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'

import { PointsMapRenderer } from './PointsMapRenderer'
import { locationRangeAnswerPayload } from './storyPayload'

export const WithMapboxSetup: Decorator = (Story, context) => {
  return (
    <MapboxAccessTokenProvider defaultAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}>
      <Story {...context} />
    </MapboxAccessTokenProvider>
  )
}

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

const Template: StoryFn<typeof PointsMapRenderer> = (args) => {
  return <PointsMapRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: locationRangeAnswerPayload,
}

const missingData = {
  result: {
    features: [],
  },
  schema: 'network.xyo.location.range.answer',
}

const WithNoData = Template.bind({})
WithNoData.args = {
  payload: missingData,
}

export { Default, WithData, WithNoData }
