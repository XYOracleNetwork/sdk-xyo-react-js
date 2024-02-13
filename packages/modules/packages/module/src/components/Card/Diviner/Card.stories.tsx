import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { DivinerInstance } from '@xyo-network/diviner'
import { AddressHistoryDiviner, AddressHistoryDivinerConfigSchema } from '@xyo-network/diviner-address-history'
import { useState } from 'react'

import { DivinerCard } from './Card'

const StorybookEntry = {
  title: 'modules/diviner/DivinerCard',
} as Meta<typeof DivinerCard>

const Template: StoryFn<typeof DivinerCard> = () => {
  const [module, setModule] = useState<DivinerInstance>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newModule = (await AddressHistoryDiviner.create({
          config: {
            address: '',
            name: 'AddressHistoryDiviner',
            schema: AddressHistoryDivinerConfigSchema,
          },
        })) as DivinerInstance
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
