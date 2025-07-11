import type { StandardTextFieldProps } from '@mui/material'
import { FormControl, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import React from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'
import { colorParser, InvalidPhraseTypography } from './validation-messages/index.ts'

/** @public */
export interface NewPhraseTextFieldProps extends StandardTextFieldProps {
  children?: ReactNode
  disableColor?: boolean
}

/** @public */
export const NewPhraseTextField: React.FC<NewPhraseTextFieldProps> = ({
  children, disableColor, ...props
}) => {
  const {
    phrase, setPhrase, validPhrase,
  } = useSeedPhrase()
  return (
    <>
      <FormControl
        fullWidth
        size="small"
        sx={{
          display: 'flex', flexDirection: 'column', rowGap: 1,
        }}
      >
        {children}
        <TextField
          focused
          color={disableColor ? undefined : colorParser(validPhrase)}
          error={validPhrase === false}
          helperText={validPhrase === false ? <InvalidPhraseTypography /> : null}
          fullWidth
          maxRows={Number.POSITIVE_INFINITY}
          multiline
          onChange={e => setPhrase?.(e.target.value)}
          value={phrase}
          {...props}
        />
      </FormControl>
    </>
  )
}
