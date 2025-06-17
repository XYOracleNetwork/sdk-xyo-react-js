import { Chip } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol } from '@xylabs/react-flexbox'
import { isDefined } from '@xylabs/typeof'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { useEvent } from '@xyo-network/react-event'
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

const Template: StoryFn<typeof BlockTable> = ({ blocks: blocksProp, ...args }) => {
  const [blocks, setBlocks] = useState<BoundWitness[]>(blocksProp ?? [])
  const [eventData, setEventData] = useState<string | undefined>()
  const [ref] = useEvent<HTMLTableElement>((_noun, _verb, data) => {
    console.log('Event received:', _noun, _verb, data)
    setEventData(data)
  })

  return (
    <BrowserRouter>
      <FlexCol alignItems="stretch">
        {isDefined(eventData)
          ? <Chip label={`EventData: ${eventData}`} onDelete={() => setEventData(undefined)} />
          : null}
        <BlockTable blocks={blocks} ref={ref} {...args} />
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
WithData.args = { blocks: sampleBlocks, clickableFields: ['hash'] }

const WithError = Template.bind({})
WithError.args = { blocks: [sampleBlock, badBlock as BoundWitness] }

export {
  Default, WithData, WithError,
}

export default StorybookEntry
