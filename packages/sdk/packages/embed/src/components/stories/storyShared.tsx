import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ApiEmbedPluginCard } from '../embed-card/index.ts'

export const xyoEmbedStoryBase: Meta = {
  argTypes: {},
  component: ApiEmbedPluginCard,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export const Template: StoryFn<typeof ApiEmbedPluginCard> = (args) => {
  return (
    <BrowserRouter>
      <ApiEmbedPluginCard {...args} />
    </BrowserRouter>
  )
}
