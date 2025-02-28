import { Button, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { BigIntInput } from './Input.ts'

export default { title: 'Input/Bigint/WithFormControl', component: BigIntInput.WithFormControl } as Meta<typeof BigIntInput.WithFormControl>

const Template: StoryFn<typeof BigIntInput.WithFormControl> = ({ textFieldProps, ...args }) => {
  const [bigIntString, setBigIntString] = useState<string>()
  const [resetValue, setResetValue] = useState<boolean>(false)

  const onChangeFixedPoint = (value?: bigint) => {
    setBigIntString(value?.toString())
  }

  return (
    <FlexCol alignItems="start" gap={2}>
      <Button variant="contained" onClick={() => setResetValue(!resetValue)}>Reset</Button>
      <BigIntInput.WithFormControl
        textFieldProps={{
          ...textFieldProps, resetValue, onChangeFixedPoint,
        }}
        {...args}
      />
      {bigIntString
        ? (
            <Typography>
              BigInt:
              {' '}
              {bigIntString}
            </Typography>
          )
        : null}
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  textFieldProps: {
    helperText: 'Enter Amount', hideAdornment: true, defaultRawValue: '1.4',
  },
}

const WithHiddenAdornment = Template.bind({})
WithHiddenAdornment.args = { textFieldProps: { hideAdornment: true } }

const WithHelperText = Template.bind({})
WithHelperText.args = { textFieldProps: { helperText: 'Enter Amount', hideAdornment: true } }

export {
  Default, WithDefaultValue, WithHelperText, WithHiddenAdornment,
}
