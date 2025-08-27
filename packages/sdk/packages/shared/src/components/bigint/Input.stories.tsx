import { Button, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { BigIntInput } from './Input.ts'

export default { title: 'Input/Bigint/WithFormControl', component: BigIntInput.WithFormControl } as Meta<typeof BigIntInput.WithFormControl>

const Template: StoryFn<typeof BigIntInput.WithFormControl> = ({ textFieldProps, ...args }) => {
  const [bigIntString, setBigIntString] = useState<string>()
  const [bigIntFormattedString, setBigIntFormattedString] = useState<string>()
  const [resetValue, setResetValue] = useState(0)

  const onChangeFixedPoint = (value?: bigint) => {
    setBigIntString(value?.toString())
  }

  const onChangeFormatted = (value?: string) => {
    setBigIntFormattedString(value)
  }

  return (
    <FlexCol alignItems="start" gap={2}>
      <Button variant="contained" onClick={() => setResetValue(resetValue + 1)}>Reset</Button>
      <BigIntInput.WithFormControl
        textFieldProps={{
          ...textFieldProps, resetValue, onChangeFixedPoint, onChangeFormatted,
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
      {bigIntFormattedString
        ? (
            <Typography>
              BigIntFormattedString:
              {' '}
              {bigIntFormattedString}
            </Typography>
          )
        : null}
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithDefaultFixedPoint = Template.bind({})
WithDefaultFixedPoint.args = {
  textFieldProps: {
    helperText: 'Enter Amount', hideAdornment: true, defaultRawValue: '1', defaultFixedPoint: 0,
  },
}

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
  Default, WithDefaultFixedPoint, WithDefaultValue, WithHelperText, WithHiddenAdornment,
}
