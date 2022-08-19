import { ComponentStory, Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { XyoEmbedPlugin } from '../XyoEmbedPlugin'

export const xyoEmbedStoryBase: Meta = {
  argTypes: {},
  component: XyoEmbedPlugin,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export const Template: ComponentStory<typeof XyoEmbedPlugin> = (args) => {
  return (
    <BrowserRouter>
      <XyoEmbedPlugin {...args} />
    </BrowserRouter>
  )
}
