import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { IdWitness } from '@xyo-network/id-plugin'

import { WitnessCard } from './Card'

const StorybookEntry = {
  component: WitnessCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/witness/WitnessCard',
} as Meta<typeof WitnessCard>

const IdWitnessTemplate: StoryFn<typeof WitnessCard> = () => {
  const [witness] = usePromise(async () => {
    return await IdWitness.create()
  }, [])

  return (
    <FlexCol gap={2}>
      <WitnessCard module={witness} />
    </FlexCol>
  )
}

const IdWitnessCard = IdWitnessTemplate.bind({})

export { IdWitnessCard }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
