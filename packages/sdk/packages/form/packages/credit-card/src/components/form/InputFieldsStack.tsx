import type { StackProps } from '@mui/material'
import { Stack } from '@mui/material'
import type { PropsWithChildren } from 'react'
import React from 'react'

import {
  CreditCardCvvWithFormControl,
  CreditCardEmailWithFormControl,
  CreditCardExpirationWithFormControl,
  CreditCardNumberWithFormControl,
  CreditCardZipWithFormControl,
  NameWithFormControl,
} from '../controls/index.ts'

export interface InputFieldsStackProps extends StackProps, PropsWithChildren {}

export const InputFieldsStack: React.FC<InputFieldsStackProps> = (props) => {
  const { sx } = props
  return (
    <>
      <Stack
        gap={2}
        sx={{
          flexDirection: {
            md: 'row', xs: 'column',
          },
          ...sx,
        }}
        {...props}
      >
        <NameWithFormControl autoCompleteLabel="given-name" fieldLabel="First" formControlName="firstName" placeholder="Jerry" />
        <NameWithFormControl autoCompleteLabel="family-name" fieldLabel="Last" formControlName="lastName" placeholder="Smith" />
      </Stack>
      <Stack
        gap={2}
        sx={{
          flexDirection: {
            lg: 'row', xs: 'column',
          },
          ...sx,
        }}
        {...props}
      >
        <Stack width={{
          lg: '50%', xs: '100%',
        }}
        >
          <CreditCardNumberWithFormControl />
        </Stack>
        <Stack
          direction={{
            lg: 'row', xs: 'column',
          }}
          gap={2}
          width={{
            lg: '50%', xs: '100%',
          }}
        >
          <CreditCardCvvWithFormControl />
          <CreditCardExpirationWithFormControl />
        </Stack>
      </Stack>
      <Stack
        gap={2}
        sx={{
          flexDirection: {
            md: 'row', xs: 'column',
          },
          ...sx,
        }}
        {...props}
      >
        <Stack width={{
          md: '25%', xs: '100%',
        }}
        >
          <CreditCardZipWithFormControl />
        </Stack>
        <Stack width={{
          md: '75%', xs: '100%',
        }}
        >
          <CreditCardEmailWithFormControl />
        </Stack>
      </Stack>
    </>
  )
}
