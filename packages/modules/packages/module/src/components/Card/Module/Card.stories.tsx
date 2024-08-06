import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistInstance, MemoryArchivist } from '@xyo-network/archivist'
import { useState } from 'react'

import { ModuleCard } from './Card.js'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: ModuleCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/module/ModuleCard',
} as Meta<typeof ModuleCard>

const Template: StoryFn<typeof ModuleCard> = () => {
  const [mod, setModule] = useState<ArchivistInstance>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!mod) {
        const newModule = await MemoryArchivist.create()
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [mod],
  )

  return <ModuleCard mod={mod} />
}

const SingleModule = Template.bind({})

export { SingleModule }

export default StorybookEntry
