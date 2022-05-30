import { Container } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ButtonEx, FlexCol, FlexRow } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { sampleBlock } from '../../../../../.storybook'
import { BlockTable } from './Table'

const StorybookEntry = {
  argTypes: {},
  component: BlockTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'block/Table',
} as ComponentMeta<typeof BlockTable>

const Template: ComponentStory<typeof BlockTable> = ({ blocks: blocksParam, ...args }) => {
  const [blocks, setBlocks] = useState<XyoBoundWitness[]>(blocksParam ?? [])
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <FlexCol alignItems="stretch">
          <BlockTable blocks={blocks} {...args}></BlockTable>
        </FlexCol>
        <ButtonEx onClick={() => setBlocks([...blocks, sampleBlock])}>Add</ButtonEx>
      </Container>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { _hash, ...badBlock } = sampleBlock

const WithData = Template.bind({})
WithData.args = { blocks: [sampleBlock] }

const WithError = Template.bind({})
WithError.args = { blocks: [sampleBlock, badBlock as XyoBoundWitness] }

export { Default, WithData, WithError }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
