import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'
import type { TextFieldProps } from '@mui/material'
import {
  InputAdornment, styled, TextField,
} from '@mui/material'
import type { KeyboardEvent } from 'react'
import React from 'react'

export type CodeTextFieldProps = TextFieldProps & {
  codeInput?: string
  disabled?: boolean
  onEnter?: () => void
  setCodeInput?: (code?: string) => void
  validCode?: boolean | null
}

export const CodeTextField: React.FC<CodeTextFieldProps> = ({
  codeInput, disabled, onEnter, setCodeInput, validCode, ...props
}) => (
  <StyledTextField
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="start">
            {/* Having a display block element for all 3 states (null, false, true) means the icon coming in and out
            does not affect the overall width */}
            <CheckCircleOutline sx={{ display: validCode === null ? 'block' : 'hidden', visibility: 'hidden' }} />
            <CheckCircleOutline
              color="success"
              fontSize="medium"
              sx={{ position: 'absolute', visibility: validCode === true ? 'visible' : 'hidden' }}
            />
            <ErrorOutline color="error" fontSize="medium" sx={{ position: 'absolute', visibility: validCode === false ? 'visible' : 'hidden' }} />
          </InputAdornment>
        ),
      },
    }}
    onKeyUp={(event: KeyboardEvent) => (event.key === 'Enter' && !disabled ? onEnter?.() : null)}
    autoFocus
    size="small"
    value={codeInput ?? ''}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCodeInput?.(event.target.value)}
    {...props}
  />
)

const StyledTextField = styled(TextField, { name: 'StyledTextField' })(() => ({ '& .MuiInputBase-root': { paddingRight: 0 } }))
