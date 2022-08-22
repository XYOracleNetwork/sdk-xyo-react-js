import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { quadKeyHeatMapPayload } from './payload.stories'
import { QuadkeyHeatMapWithSettingsRenderer } from './QuadkeyHeatMapRenderer'

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

const Template: ComponentStory<typeof QuadkeyHeatMapWithSettingsRenderer> = (args) => {
  return <QuadkeyHeatMapWithSettingsRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: quadKeyHeatMapPayload,
}

export { Default, WithData }
