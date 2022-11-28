import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { PayloadWrapper } from '@xyo-network/payload'
import { sampleBlock } from '@xyo-network/react-storybook'

import { HashSelectionHistoryProvider } from '../../../contexts'
import { NestedBoundWitnessesBox } from './NestedBoundWitnessesBox'

const WithHashSelectionHistory: DecoratorFn = (Story, args) => {
  const hash = new PayloadWrapper(sampleBlock).hash
  const defaultHashSelectionHistory = [hash, hash]
  const defaultNestedBoundWitnesses = {
    [hash]: sampleBlock,
  }
  return (
    <HashSelectionHistoryProvider
      defaultHashSelectionHistory={defaultHashSelectionHistory}
      defaultNestedBoundWitnesses={defaultNestedBoundWitnesses}
      required={false}
    >
      <Story {...args} />
    </HashSelectionHistoryProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: NestedBoundWitnessesBox,
  decorators: [WithHashSelectionHistory],
  title: 'address/history/NestedBoundWitnessesBox',
} as Meta

const Template: ComponentStory<typeof NestedBoundWitnessesBox> = (props) => {
  return <NestedBoundWitnessesBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
