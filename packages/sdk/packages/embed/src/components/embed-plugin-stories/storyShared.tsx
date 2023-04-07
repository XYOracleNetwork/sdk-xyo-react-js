import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { XyoEmbedPluginCard } from '../embed-card'

export const xyoEmbedStoryBase: Meta = {
  argTypes: {},
  component: XyoEmbedPluginCard,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export const Template: StoryFn<typeof XyoEmbedPluginCard> = (args) => {
  return (
    <BrowserRouter>
      <XyoEmbedPluginCard {...args} />
    </BrowserRouter>
  )
}
