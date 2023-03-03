import { Button } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { NodeConfigSchema } from '@xyo-network/node'

import { MemoryNodeProvider, NodeDrawerProvider, useNodeDrawer } from '../contexts'
import { NodeDrawer } from './NodeDrawer'

const ProviderDecorator: DecoratorFn = (Story, args) => (
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
} as ComponentMeta<typeof NodeDrawer>

const Template: ComponentStory<typeof NodeDrawer> = (args) => {
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
