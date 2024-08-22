import type { Meta } from '@storybook/react'

import { ApiEmbedPluginCard } from '../embed-card/index.ts'

export const xyoEmbedStoryBase: Meta = {
  argTypes: {},
  component: ApiEmbedPluginCard,
  parameters: { docs: { page: null } },
}
