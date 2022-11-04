import { ComponentStory, Meta } from '@storybook/react'

import { AddressHistory } from './AddressHistory'
import { ActiveBWDecorator, sampleAddressHistory } from './storybook'

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistory,
  title: 'addressHistory/AddressHistory',
} as Meta

const Template: ComponentStory<typeof AddressHistory> = (props) => {
  return <AddressHistory sx={{ minHeight: '200px', minWidth: '100px' }} {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { addressHistory: sampleAddressHistory }

const WithDataActive = Template.bind({})
WithDataActive.args = { activeBoundWitness: sampleAddressHistory[0], addressHistory: sampleAddressHistory }
WithDataActive.decorators = [ActiveBWDecorator]

export { Default, WithData, WithDataActive }
