import { Button } from '@mui/material'
import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import { NodeConfigSchema } from '@xyo-network/node-model'
import {
  MemoryNodeProvider, NodeDrawerProvider, useNodeDrawer,
} from '@xyo-network/react-node-provider'
import React from 'react'

import { NodeDrawer } from './NodeDrawer.tsx'

const ProviderDecorator: Decorator = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <NodeDrawerProvider defaultOpen>
      <Story {...args} />
    </NodeDrawerProvider>
  </MemoryNodeProvider>
)

const StorybookEntry = {
  component: NodeDrawer,
  decorators: [ProviderDecorator],
  title: 'modules/node/NodeDrawer',
} as Meta<typeof NodeDrawer>

const Template: StoryFn<typeof NodeDrawer> = (args) => {
  const { setOpen } = useNodeDrawer()
  return (
    <FlexCol>
      <Button onClick={() => setOpen?.(previous => !previous)} variant="contained">
        Toggle Drawer
      </Button>
      <NodeDrawer {...args}></NodeDrawer>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

export default StorybookEntry
