import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { IdWitness } from '@xyo-network/id-plugin'
import React from 'react'

import { WitnessCard } from './Card.tsx'

const StorybookEntry = {
  component: WitnessCard,
  parameters: { docs: { page: null } },
  title: 'modules/witness/WitnessCard',
} as Meta<typeof WitnessCard>

const IdWitnessTemplate: StoryFn<typeof WitnessCard> = () => {
  const [witness] = usePromise(async () => {
    return await IdWitness.create({})
  }, [])

  return (
    <FlexCol gap={2}>
      <WitnessCard mod={witness} />
    </FlexCol>
  )
}

const IdWitnessCard = IdWitnessTemplate.bind({})

export { IdWitnessCard }

export default StorybookEntry
