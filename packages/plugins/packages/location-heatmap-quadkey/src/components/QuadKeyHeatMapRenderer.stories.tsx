import { Decorator, Meta, StoryFn } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'
import { BrowserRouter } from 'react-router-dom'

import { QuadkeyHeatMapWithSettingsRenderer } from './QuadkeyHeatMapRenderer.js'
import { QuadkeyHeatMapSettings } from './QuadKeyHeatMapSettings.js'
import { quadKeyHeatMapPayload } from './storyPayload.js'

const WithMapboxSetup: Decorator = (Story, context) => {
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
  component: QuadkeyHeatMapWithSettingsRenderer,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/heat-map/HeatMapWithSettings',
} as Meta

const Template: StoryFn<typeof QuadkeyHeatMapWithSettingsRenderer> = (args) => {
  return (
    <BrowserRouter>
      <QuadkeyHeatMapWithSettingsRenderer style={{ height: 'calc(100vh - 20px)' }} {...args} />
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: quadKeyHeatMapPayload,
}

const WithDevMode = Template.bind({})
const settings = QuadkeyHeatMapSettings()
settings.debugLayer.value = true
WithDevMode.args = {
  developerMode: true,
  payload: quadKeyHeatMapPayload,
  settings,
}

export { Default, WithData, WithDevMode }
