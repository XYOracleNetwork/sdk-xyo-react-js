/* eslint-disable @delagen/deprecation/deprecation */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BusyBox } from './BusyBox'

const StorybookEntry = {
  argTypes: {},
  component: BusyBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'BusyBox',
} as ComponentMeta<typeof BusyBox>

const BusyBoxTemplate: ComponentStory<typeof BusyBox> = (args) => <BusyBox {...args}></BusyBox>

const Circular = BusyBoxTemplate.bind({})
Circular.args = {
  bgcolor: 'gray',
  busy: true,
  busyVariant: 'circular',
  height: 180,
  padding: 2,
  width: 360,
}

const Linear = BusyBoxTemplate.bind({})
Linear.args = {
  bgcolor: 'gray',
  busy: true,
  busyVariant: 'linear',
  height: 180,
  padding: 2,
  width: 360,
}

const LinearBuffer = BusyBoxTemplate.bind({})
LinearBuffer.args = {
  bgcolor: 'gray',
  busy: true,
  busyLinearProps: {
    variant: 'buffer',
  },
  busyVariant: 'linear',
  height: 180,
  padding: 2,
  width: 360,
}

const LinearDeterminate = BusyBoxTemplate.bind({})
LinearDeterminate.args = {
  bgcolor: 'gray',
  busy: true,
  busyLinearProps: {
    variant: 'determinate',
  },
  busyVariant: 'linear',
  height: 180,
  padding: 2,
  width: 360,
}

const LinearQuery = BusyBoxTemplate.bind({})
LinearQuery.args = {
  bgcolor: 'gray',
  busy: true,
  busyLinearProps: {
    variant: 'query',
  },
  busyVariant: 'linear',
  height: 180,
  padding: 2,
  width: 360,
}

export { Circular, Linear, LinearBuffer, LinearDeterminate, LinearQuery }

export default StorybookEntry
