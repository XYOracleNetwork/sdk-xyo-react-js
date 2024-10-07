import { Alert, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { AccessCodeGateFlexbox } from './AccessCodeGateFlexbox.tsx'

export default {
  component: AccessCodeGateFlexbox,
  title: 'access/AccessCodeGateFlexbox',
} as Meta

const Template: StoryFn<typeof AccessCodeGateFlexbox> = args => (
  <AccessCodeGateFlexbox {...args} />
)

const TemplateWithAccessCodes: StoryFn<typeof AccessCodeGateFlexbox> = (args) => {
  const validAccessCodes = ['100519']
  const [validated, setValidated] = useState(false)
  const onAccessCodeSuccess = () => {
    setValidated(true)
  }
  const validateFunction = (code?: string) => code?.length === 6

  return validated
    ? <Alert severity="success">Success!</Alert>
    : (
        <FlexCol gap={2}>
          <AccessCodeGateFlexbox
            onAccessCodeSuccess={onAccessCodeSuccess}
            validAccessCodes={validAccessCodes}
            validateFunction={validateFunction}
          />
          <Typography variant="caption">Hint: 100519</Typography>
        </FlexCol>
      )
}

const Default = Template.bind({})
const WithAccessCodes = TemplateWithAccessCodes.bind({})

export { Default, WithAccessCodes }
