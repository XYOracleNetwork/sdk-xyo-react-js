import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/sdk-react'

import { authDecorator, authServiceList, WrappedArgs } from '../../../.storybook'
import { AppSettingsProvider } from '../../../contexts'
import { ArchiveSelectEx } from './ArchiveSelectEx'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
        jwtToken: 'badToken',
        loggedInAccount: 'none@none.com',
      },
    },
  },
  component: ArchiveSelectEx,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ArchiveSelectEx',
} as ComponentMeta<typeof ArchiveSelectEx>

const Template: ComponentStory<typeof ArchiveSelectEx> = (args) => {
  const combinedArgs = args as WrappedArgs & SelectExProps<string>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authState, ...props } = combinedArgs
  return (
    <AppSettingsProvider value={{}}>
      <ArchiveSelectEx {...props}></ArchiveSelectEx>
    </AppSettingsProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
