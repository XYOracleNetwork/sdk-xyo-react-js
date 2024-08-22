import type { Meta, StoryFn } from '@storybook/react'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol } from '@xylabs/react-flexbox'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { sampleBlock } from '@xyo-network/react-storybook'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { BlockTable } from './Table.tsx'

const StorybookEntry = {
  argTypes: {},
  component: BlockTable,
  parameters: { docs: { page: null } },
  title: 'block/Table',
} as Meta<typeof BlockTable>

const Template: StoryFn<typeof BlockTable> = ({ blocks: blocksParam, ...args }) => {
  const [blocks, setBlocks] = useState<BoundWitness[]>(blocksParam ?? [])
  return (
    <BrowserRouter>
      <FlexCol alignItems="stretch">
        <BlockTable blocks={blocks} {...args}></BlockTable>
      </FlexCol>
      <ButtonEx onClick={() => setBlocks([...blocks, sampleBlock])}>Add</ButtonEx>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const badBlock = sampleBlock

const WithData = Template.bind({})
const sampleBlocks = [...Array(100).keys()].map(() => sampleBlock)
WithData.args = { blocks: sampleBlocks }

const WithError = Template.bind({})
WithError.args = { blocks: [sampleBlock, badBlock as BoundWitness] }

export {
  Default, WithData, WithError,
}

export default StorybookEntry
