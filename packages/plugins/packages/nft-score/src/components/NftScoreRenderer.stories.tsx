import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { NftScoreRenderer } from './NftScoreRenderer.js'
import { payloadDataFullScores, payloadDataPartialScores } from './storyPayloadData.js'

const StorybookEntry = {
  argTypes: {},
  component: NftScoreRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/nft-score/NftScoreRenderer',
} as Meta<typeof NftScoreRenderer>

const Template: StoryFn<typeof NftScoreRenderer> = args => <NftScoreRenderer {...args}></NftScoreRenderer>

const Default = Template.bind({})
Default.args = {}

const WithFullScores = Template.bind({})
WithFullScores.args = { payload: payloadDataFullScores }

const WithPartialScores = Template.bind({})
WithPartialScores.args = { payload: payloadDataPartialScores }

export { Default, WithFullScores, WithPartialScores }

export default StorybookEntry
