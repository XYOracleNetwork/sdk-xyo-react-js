import { ComponentStory, Meta } from '@storybook/react'

import { ArchivesProvider } from '../../../archives'
import { ArchivistApiProvider } from '../../../archivist-api'
import { NetworkMemoryProvider } from '../../../network'
import { SystemControls } from './SystemControls'
import { SystemControlsType } from './SystemControlsType'

const StorybookEntry: Meta = {
  argTypes: {},
  component: SystemControls,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'System/SystemControls',
}

const Template: ComponentStory<typeof SystemControls> = (props) => {
  return (
    <NetworkMemoryProvider>
      <ArchivistApiProvider apiDomain="http://localhost:8080">
        <ArchivesProvider>
          <SystemControls {...props} />
        </ArchivesProvider>
      </ArchivistApiProvider>
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

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
