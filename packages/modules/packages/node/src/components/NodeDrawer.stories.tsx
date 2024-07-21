import { Button } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { MemoryNodeProvider, NodeDrawerProvider, useNodeDrawer } from '@xyo-network/react-node-provider'

import { NodeDrawer } from './NodeDrawer.js'

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
      <Button onClick={() => setOpen?.((previous) => !previous)} variant="contained">
        Toggle Drawer
      </Button>
      <NodeDrawer {...args}></NodeDrawer>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
