import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ApiEmbedPluginCard } from '../embed-card/index.js'

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
