import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { NftScoreRenderer } from './NftScoreRenderer.tsx'
import { payloadDataFullScores, payloadDataPartialScores } from './storyPayloadData.tsx'

const StorybookEntry = {
  argTypes: {},
  component: NftScoreRenderer,
  parameters: { docs: { page: null } },
  title: 'plugin/nft-score/NftScoreRenderer',
} as Meta<typeof NftScoreRenderer>

const Template: StoryFn<typeof NftScoreRenderer> = args => <NftScoreRenderer {...args}></NftScoreRenderer>

const Default = Template.bind({})
Default.args = {}

const WithFullScores = Template.bind({})
WithFullScores.args = { payload: payloadDataFullScores }

const WithPartialScores = Template.bind({})
WithPartialScores.args = { payload: payloadDataPartialScores }

export {
  Default, WithFullScores, WithPartialScores,
}

export default StorybookEntry
