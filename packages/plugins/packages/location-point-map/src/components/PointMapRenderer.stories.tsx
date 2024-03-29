import { Decorator, Meta, StoryFn } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'

import { PointMapWithSettingsRenderer } from './PointMapRenderer'
import { locationPayload } from './storyPayload'

const WithMapboxSetup: Decorator = (Story, context) => {
  return (
    <MapboxAccessTokenProvider defaultAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}>
      <Story {...context} />
    </MapboxAccessTokenProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  args: {
    // calc used to account for the offset provided by storybook wrapper
    minHeight: 'calc(100vh - 2rem)',
  },
  component: PointMapWithSettingsRenderer,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/point-map/PointMap',
} as Meta

const Template: StoryFn<typeof PointMapWithSettingsRenderer> = (args) => {
  return <PointMapWithSettingsRenderer {...args} />
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
