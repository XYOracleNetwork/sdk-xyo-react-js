import { Button } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useXyoEvent } from '@xyo-network/react-event'

import { useActiveBoundWitness } from '../../../contexts'
import { ActiveBWDecorator } from '../../story'
import { ActiveBWFlexBox } from './ActiveBWFlexBox'

const WithRefDecorator: DecoratorFn = (Story, args) => {
  const [ref] = useXyoEvent((noun, verb, data) => console.log(noun, verb, data))
  args.args.ref = ref
  return <Story {...args} />
}

const WithResetDecorator: DecoratorFn = (Story, args) => {
  const { activeBoundWitness, setActiveBoundWitnessHash } = useActiveBoundWitness()
  return (
    <>
      {activeBoundWitness ? (
        <Button variant="contained" onClick={() => setActiveBoundWitnessHash?.(undefined)}>
          Reset Active BW
        </Button>
      ) : null}
      <Story {...args} />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: ActiveBWFlexBox,
  title: 'address/history/ActiveBWFlexBox',
} as Meta

const Template: ComponentStory<typeof ActiveBWFlexBox> = (props) => <ActiveBWFlexBox {...props} />

const Default = Template.bind({})
Default.args = {}

const WithActiveBW = Template.bind({})
WithActiveBW.args = {}
WithActiveBW.decorators = [ActiveBWDecorator]

const WithActiveBWRef = Template.bind({})
WithActiveBWRef.args = {}
WithActiveBWRef.decorators = [ActiveBWDecorator, WithRefDecorator]

const WithActiveBWReset = Template.bind({})
WithActiveBWReset.args = {}
WithActiveBWReset.decorators = [WithResetDecorator, ActiveBWDecorator]

export { Default, WithActiveBW, WithActiveBWRef, WithActiveBWReset }
