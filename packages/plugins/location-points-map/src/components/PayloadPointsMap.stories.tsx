import { ComponentStory, Meta } from '@storybook/react'
import { WithMapboxSetup } from '@xyo-network/react-storybook'

import { PayloadPointsMap } from './PayloadPointsMap'

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {},
  component: PayloadPointsMap,
  decorators: [WithMapboxSetup],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/points-map/PointsMap',
} as Meta

const Template: ComponentStory<typeof PayloadPointsMap> = (args) => {
  return <PayloadPointsMap {...args} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
