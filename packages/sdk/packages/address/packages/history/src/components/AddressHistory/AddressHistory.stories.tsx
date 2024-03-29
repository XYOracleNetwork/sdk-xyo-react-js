import { Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'
import { randomizedSampleAddressHistory, sampleAddressHistory } from '@xyo-network/react-storybook'

import { ActiveBWDecorator } from '../stories'
import { AddressHistory } from './AddressHistory'

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistory,
  decorators: [ActiveBWDecorator],
  title: 'address/history/AddressHistory',
} as Meta

const Template: StoryFn<typeof AddressHistory> = (props) => {
  const [ref] = useEvent<HTMLUListElement>((noun, verb, data) => console.log(noun, verb, data))
  return <AddressHistory sx={{ minHeight: '200px', minWidth: '100px' }} ref={ref} {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { addressHistory: sampleAddressHistory }

const WithDataOrdering = Template.bind({})
WithDataOrdering.args = { addressHistory: randomizedSampleAddressHistory, selectable: true }

const WithDataActive = Template.bind({})
WithDataActive.args = { addressHistory: sampleAddressHistory, selectable: true }

export { Default, WithData, WithDataActive, WithDataOrdering }
