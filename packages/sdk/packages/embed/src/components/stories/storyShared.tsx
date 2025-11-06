import type { StoryFn } from '@storybook/react-vite'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import type { PluginProps } from '../../contexts/index.ts'
import { PluginPropsProvider } from '../../contexts/index.ts'
import { ApiEmbedPluginCard } from '../embed-card/index.ts'

const pluginProps: PluginProps = { foo: true }

export const Template: StoryFn<typeof ApiEmbedPluginCard> = (args) => {
  return (
    <PluginPropsProvider pluginProps={pluginProps}>
      <BrowserRouter>
        <ApiEmbedPluginCard {...args} />
      </BrowserRouter>
    </PluginPropsProvider>
  )
}
