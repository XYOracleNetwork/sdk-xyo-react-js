import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { MemoryArchivist } from '@xyo-network/archivist'
import { Module } from '@xyo-network/module'
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
  title: 'module/ModuleCard',
} as ComponentMeta<typeof ModuleCard>

const Template: ComponentStory<typeof ModuleCard> = () => {
  const [module, setModule] = useState<Module>()

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
