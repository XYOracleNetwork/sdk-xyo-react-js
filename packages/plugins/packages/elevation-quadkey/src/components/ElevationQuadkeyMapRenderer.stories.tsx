import { Decorator, Meta, StoryFn } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'

import { ElevationQuadkeyMapWithSettingsRenderer } from './ElevationQuadkeyMap'
import { elevationQuadKeyMapPayload } from './storyPayload'

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
  component: ElevationQuadkeyMapWithSettingsRenderer,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/elevation-map/ElevationQuadkeyMap',
} as Meta

const Template: StoryFn<typeof ElevationQuadkeyMapWithSettingsRenderer> = (args) => {
  return <ElevationQuadkeyMapWithSettingsRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: elevationQuadKeyMapPayload,
}

const WithDevMode = Template.bind({})
WithDevMode.args = {
  developerMode: true,
  payload: elevationQuadKeyMapPayload,
}

export { Default, WithData, WithDevMode }
