import type { Meta, StoryFn } from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { Address } from '@xylabs/sdk-js'
import { AddressHistoryDiviner, AddressHistoryDivinerConfigSchema } from '@xyo-network/diviner-address-history'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import React, { useState } from 'react'

import { DivinerCard } from './Card.tsx'

const StorybookEntry = { title: 'modules/diviner/DivinerCard' } as Meta<typeof DivinerCard>

const Template: StoryFn<typeof DivinerCard> = () => {
  const [mod, setModule] = useState<DivinerInstance>()

  useAsyncEffect(

    async (mounted) => {
      if (!mod) {
        const newModule = (await AddressHistoryDiviner.create({
          config: {
            address: '' as Address,
            name: 'AddressHistoryDiviner',
            schema: AddressHistoryDivinerConfigSchema,
          },
        })) as DivinerInstance
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [mod],
  )

  return <DivinerCard mod={mod} />
}

const SingleModule = Template.bind({})

export { SingleModule }

export default StorybookEntry
