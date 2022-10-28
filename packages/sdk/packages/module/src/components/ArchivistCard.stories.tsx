import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { PayloadArchivist, XyoMemoryArchivist, XyoMemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { useState } from 'react'

import { ArchivistCard } from './ArchivistCard'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: ArchivistCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'module/ArchivistCard',
} as ComponentMeta<typeof ArchivistCard>

const Template: ComponentStory<typeof ArchivistCard> = () => {
  const [module, setModule] = useState<PayloadArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newParentModule = await XyoMemoryArchivist.create()
        const newModule = await XyoMemoryArchivist.create({
          config: {
            parents: { commit: [newParentModule.address], read: [newParentModule.address], write: [newParentModule.address] },
            schema: XyoMemoryArchivistConfigSchema,
          },
        })
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return <ArchivistCard module={module} />
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
