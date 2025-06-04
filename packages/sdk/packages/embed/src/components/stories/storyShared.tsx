import type { StoryFn } from '@storybook/react-vite'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ApiEmbedPluginCard } from '../embed-card/index.ts'

export const Template: StoryFn<typeof ApiEmbedPluginCard> = (args) => {
  return (
    <BrowserRouter>
      <ApiEmbedPluginCard {...args} />
    </BrowserRouter>
  )
}
