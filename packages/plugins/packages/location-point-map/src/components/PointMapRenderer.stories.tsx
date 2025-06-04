import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react-vite'

interface ImportMeta {
  env: Record<string, string>
}

import { GeographicCoordinateSystemLocationSchema } from '@xyo-network/location-payload-plugin'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map-model'
import React from 'react'

import { PointMapWithSettingsRenderer } from './PointMapRenderer.tsx'
import { currentLocationPayload, gcsLocationPayload } from './storyPayload.tsx'

const WithMapboxSetup: Decorator = (Story, context) => {
  return (
    <MapboxAccessTokenProvider defaultAccessToken={(import.meta as unknown as ImportMeta).env.STORYBOOK_MAPBOX_TOKEN}>
      <Story {...context} />
    </MapboxAccessTokenProvider>
  )
}

export default {
  args: {
    // calc used to account for the offset provided by storybook wrapper
    minHeight: 'calc(100vh - 2rem)',
  },
  component: PointMapWithSettingsRenderer,
  decorators: [WithMapboxSetup],
  parameters: { docs: { page: null } },
  title: 'plugin/point-map/PointMap',
} as Meta

const Template: StoryFn<typeof PointMapWithSettingsRenderer> = (args) => {
  return <PointMapWithSettingsRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithGCSData = Template.bind({})
WithGCSData.args = { payload: gcsLocationPayload }

const WithCurrentLocationData = Template.bind({})
WithCurrentLocationData.args = { payload: currentLocationPayload }

const missingData = {
  result: { features: [] },
  schema: GeographicCoordinateSystemLocationSchema,
}

const WithNoData = Template.bind({})
WithNoData.args = { payload: missingData }

export {
  Default, WithCurrentLocationData, WithGCSData, WithNoData,
}
