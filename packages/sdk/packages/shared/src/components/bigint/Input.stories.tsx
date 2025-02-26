import { Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { BigIntInput } from './Input.ts'

export default { title: 'Input/Bigint/WithFormControl', component: BigIntInput.WithFormControl } as Meta<typeof BigIntInput.WithFormControl>

const Template: StoryFn<typeof BigIntInput.WithFormControl> = (args) => {
  const [bigIntString, setBigIntString] = useState('')
  const onChangeBigInt = (value: bigint) => {
    setBigIntString(value.toString())
  }
  return (
    <FlexCol alignItems="start" gap={2}>
      <BigIntInput.WithFormControl textFieldProps={{ onChangeBigInt }} {...args} />
      {bigIntString
        ? (
            <Typography>
              BigInt:
              {bigIntString}
            </Typography>
          )
        : null}
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }
