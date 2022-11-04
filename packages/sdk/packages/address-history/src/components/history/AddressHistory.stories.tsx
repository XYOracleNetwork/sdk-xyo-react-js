import { ComponentStory, Meta } from '@storybook/react'

import { AddressHistory } from './AddressHistory'
import { sampleAddressHistory } from './sampleAddressHistory.stories'

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

export { Default, WithData }
