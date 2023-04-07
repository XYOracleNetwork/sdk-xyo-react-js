import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { PointMapWithSettingsRenderer } from './PointMapRenderer'
import { locationPayload } from './storyPayload'

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {
    minHeight: {
      // calc used to account for the offset provided by storybook wrapper
      defaultValue: 'calc(100vh - 2rem)',
    },
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

const Template: ComponentStory<typeof PointMapWithSettingsRenderer> = (args) => {
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
