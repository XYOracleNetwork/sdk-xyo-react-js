import { Check, Error } from '@mui/icons-material'
import {
  Box, Chip, TextField,
} from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { isDefined } from '@xylabs/typeof'
import React, { useState } from 'react'

import { CopyIconButton } from './CopyIconButton.tsx'

const StorybookEntry: Meta = {
  argTypes: {},
  component: CopyIconButton,
  parameters: { docs: { page: null } },
  title: 'IconButton/Copy',
}

const Template: StoryFn<typeof CopyIconButton> = (props) => {
  const [copyText, setCopyText] = useState<string>()
  const [copied, setCopied] = useState<boolean>(false)
  const [copiedText, setCopiedText] = useState<string>()

  return (
    <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
      <TextField value={copyText} onChange={e => setCopyText(e.target.value)} placeholder="Text to Copy" />
      <CopyIconButton onCopyCallback={() => setCopied(true)} value={copyText} {...props} />
      {copied ? <TextField defaultValue="" onChange={e => setCopiedText(e.target.value)} placeholder="Paste Text Here" /> : null}
      {isDefined(copiedText)
        ? (
            <>
              {copiedText === copyText
                ? <Chip avatar={<Check />} label="Text Matches!" />
                : <Chip avatar={<Error />} label="Text Does Not Match!" />}
            </>
          )
        : null}
    </Box>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithSmall = Template.bind({})
WithSmall.args = { size: 'small', copyIconProps: { fontSize: 'small' } }

export { Default, WithSmall }

export default StorybookEntry
