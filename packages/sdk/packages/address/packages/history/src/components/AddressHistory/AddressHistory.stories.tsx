import { ComponentStory, Meta } from '@storybook/react'
import { useXyoEvent } from '@xyo-network/react-event'
import { randomizedSampleAddressHistory, sampleAddressHistory } from '@xyo-network/react-storybook'

import { ActiveBWDecorator } from '../story'
import { AddressHistory } from './AddressHistory'

// eslint-disable-next-line import/no-default-export
export default {
  component: AddressHistory,
  title: 'addressHistory/AddressHistory',
} as Meta

const Template: ComponentStory<typeof AddressHistory> = (props) => {
  const [ref] = useXyoEvent<HTMLUListElement>((noun, verb, data) => console.log(noun, verb, data))
  return <AddressHistory sx={{ minHeight: '200px', minWidth: '100px' }} ref={ref} {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { addressHistory: sampleAddressHistory }

const WithDataOrdering = Template.bind({})
WithDataOrdering.args = { addressHistory: randomizedSampleAddressHistory, selectable: true }
WithDataOrdering.decorators = [ActiveBWDecorator]

const WithDataActive = Template.bind({})
WithDataActive.args = { addressHistory: sampleAddressHistory, selectable: true }
WithDataActive.decorators = [ActiveBWDecorator]

export { Default, WithData, WithDataActive, WithDataOrdering }
