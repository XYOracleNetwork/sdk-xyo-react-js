/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SelectExProps } from '@xylabs/react-common'
import { WithChildren } from '@xylabs/react-shared'
import { XyoArchive } from '@xyo-network/api'
import { authDecorator, WrappedArgs } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { ArchivesContext } from '../../archives'
import { ApiProvider } from '../../contexts'
import { ArchiveContext } from '../contexts'
import { ArchiveSelectEx } from './ArchiveSelectEx'

const StorybookEntry = {
  argTypes: {},
  component: ArchiveSelectEx,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archive/ArchiveSelectEx',
} as ComponentMeta<typeof ArchiveSelectEx>

const veryLongArchiveName = 'some-very-very-long-archive-name-that-should-be-truncated'
const temp = 'temp'

const FakeArchivesProvider: React.FC<WithChildren> = ({ children }) => {
  const archives: XyoArchive[] = [
    {
      accessControl: false,
      archive: veryLongArchiveName,
      user: '0x2345',
    },
    {
      accessControl: false,
      archive: 'temp',
      user: '0x2345',
    },
  ]
  return <ArchivesContext.Provider value={{ archives, provided: true }}>{children}</ArchivesContext.Provider>
}

const FakeArchiveProvider: React.FC<WithChildren> = ({ children }) => {
  const [archive, setArchive] = useState(temp)
  return <ArchiveContext.Provider value={{ archive, provided: true, setArchive }}>{children}</ArchiveContext.Provider>
}

const Template: ComponentStory<typeof ArchiveSelectEx> = (args) => {
  const combinedArgs = args as WrappedArgs & SelectExProps<string>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authState, ...props } = combinedArgs
  return (
    <ApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <FakeArchivesProvider>
        <FakeArchiveProvider>
          <ArchiveSelectEx {...props}></ArchiveSelectEx>
        </FakeArchiveProvider>
      </FakeArchivesProvider>
    </ApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
