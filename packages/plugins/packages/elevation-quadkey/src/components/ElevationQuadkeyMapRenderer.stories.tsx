import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { ElevationQuadkeyMapWithSettingsRenderer } from './ElevationQuadkeyMap'
import { elevationQuadKeyMapPayload } from './storyPayload'

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

const Template: ComponentStory<typeof ElevationQuadkeyMapWithSettingsRenderer> = (args) => {
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
