import type { Meta, StoryFn } from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistInstance } from '@xyo-network/archivist'
import { MemoryArchivist } from '@xyo-network/archivist-memory'
import React, { useState } from 'react'

import { ModuleCard } from './Card.tsx'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: ModuleCard,
  parameters: { docs: { page: null } },
  title: 'modules/module/ModuleCard',
} as Meta<typeof ModuleCard>

const Template: StoryFn<typeof ModuleCard> = () => {
  const [mod, setModule] = useState<ArchivistInstance>()

  useAsyncEffect(

    async (mounted) => {
      if (!mod) {
        const newModule = await MemoryArchivist.create({})
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
