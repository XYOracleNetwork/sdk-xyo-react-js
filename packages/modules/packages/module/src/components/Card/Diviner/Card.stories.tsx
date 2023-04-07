import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { AddressHistoryDivinerConfigSchema, DivinerModule, MemoryAddressHistoryDiviner } from '@xyo-network/diviner'
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
  title: 'modules/diviner/DivinerCard',
} as ComponentMeta<typeof DivinerCard>

const Template: ComponentStory<typeof DivinerCard> = () => {
  const [module, setModule] = useState<DivinerModule>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newModule = await MemoryAddressHistoryDiviner.create({
          config: {
            address: '',
            schema: AddressHistoryDivinerConfigSchema,
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
