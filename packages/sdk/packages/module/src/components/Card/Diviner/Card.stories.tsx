import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { AbstractDiviner, MemoryAddressHistoryDiviner } from '@xyo-network/diviner'
import { useState } from 'react'

import { DivinerCard } from './Card'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: DivinerCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'module/DivinerCard',
} as ComponentMeta<typeof DivinerCard>

const Template: ComponentStory<typeof DivinerCard> = () => {
  const [module, setModule] = useState<AbstractDiviner>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newModule = await MemoryAddressHistoryDiviner.create({
          config: {
            schema: MemoryArchivistConfigSchema,
          },
        })
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return <DivinerCard module={module} />
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
