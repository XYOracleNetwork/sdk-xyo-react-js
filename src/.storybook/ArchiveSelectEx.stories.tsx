import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/sdk-react'

import { authDecorator, authServiceList, WrappedArgs } from './authHelpers'
import { ArchivesProvider } from '../../packages/archive/src/archives'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { ArchiveProvider } from '../../packages/archive/src/archive/contexts'
import { ArchiveSelectEx } from '../../packages/archive/src/archive/components/ArchiveSelectEx'

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
    <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <ArchivesProvider>
        <ArchiveProvider>
          <ArchiveSelectEx {...props}></ArchiveSelectEx>
        </ArchiveProvider>
      </ArchivesProvider>
    </ArchivistApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
