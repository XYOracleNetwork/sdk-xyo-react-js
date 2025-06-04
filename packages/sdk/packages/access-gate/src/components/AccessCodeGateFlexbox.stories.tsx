import { Alert, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { useAccessCodes } from '../hooks/index.ts'
import { AccessCodeGateFlexbox } from './AccessCodeGateFlexbox.tsx'

const ValidAccessCodes = ['100519']

export default {
  component: AccessCodeGateFlexbox,
  title: 'access/AccessCodeGateFlexbox',
} as Meta

const Template: StoryFn<typeof AccessCodeGateFlexbox> = args => (
  <AccessCodeGateFlexbox {...args} />
)

const TemplateWithAccessCodes: StoryFn<typeof AccessCodeGateFlexbox> = (args) => {
  const {
    codeInput, validated, onAccessCodeSuccess, onCodeInputChange, validateCodeInput,
  } = useAccessCodes('storybook-access-codes-test')

  return validated
    ? <Alert severity="success">Success!</Alert>
    : (
        <FlexCol gap={2}>
          <AccessCodeGateFlexbox
            onAccessCodeSuccess={onAccessCodeSuccess}
            onCodeInputChange={onCodeInputChange}
            validAccessCodes={ValidAccessCodes}
            validateFunction={validateCodeInput}
            {...args}
          />
          <Typography variant="caption" gutterBottom>
            Hint:
            {ValidAccessCodes[0]}
          </Typography>
          <Typography variant="caption">
            Code Input in Parent:
            {codeInput}
          </Typography>
        </FlexCol>
      )
}

const Default = Template.bind({})
const WithAccessCodes = TemplateWithAccessCodes.bind({})

export { Default, WithAccessCodes }
