import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistInstance, MemoryArchivist } from '@xyo-network/archivist'
import { useState } from 'react'

import { ModuleCard } from './Card'

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
  const [module, setModule] = useState<ArchivistInstance>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newModule = await MemoryArchivist.create()
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return <ModuleCard module={module} />
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
