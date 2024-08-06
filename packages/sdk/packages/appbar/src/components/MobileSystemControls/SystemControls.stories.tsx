import { Meta, StoryFn } from '@storybook/react'
import { NetworkMemoryProvider } from '@xyo-network/react-network'

import { SystemControls } from './SystemControls.js'
import { SystemControlsType } from './SystemControlsType.js'

const StorybookEntry: Meta = {
  argTypes: {},
  component: SystemControls,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/System/SystemControls',
}

const Template: StoryFn<typeof SystemControls> = (props) => {
  return (
    <NetworkMemoryProvider>
      <SystemControls {...props} />
    </NetworkMemoryProvider>
  )
}

const Left = Template.bind({})
Left.args = {
  systemControlsType: SystemControlsType.Left,
  visible: true,
}

const Top = Template.bind({})
Top.args = {
  systemControlsType: SystemControlsType.WindowShade,
  visible: true,
}

export { Left, Top }

export default StorybookEntry
