import { FormControl as MuiFormControl, StandardTextFieldProps, TextField } from '@mui/material'
import { FormControl } from '@xyo-network/react-form-group'
import { LabeledTextFieldWrapper } from '@xyo-network/react-shared'
import React, { ChangeEventHandler, FocusEventHandler, forwardRef, KeyboardEvent } from 'react'

export interface FormControlTextFieldProps extends StandardTextFieldProps {
  fieldLabel: string
  formControl?: FormControl<StandardTextFieldProps>
  formControlError?: string
}

export const FormControlTextField = forwardRef<HTMLDivElement, FormControlTextFieldProps>(
  ({ formControl, formControlError, fieldLabel = '', ...props }, ref) => {
    const { name } = formControl?.props ?? {}

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      formControl?.setValue(event.target.value)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      formControl?.blurError?.(event.target.value)
      formControl?.setTouched(true)
    }

    return (
      <MuiFormControl fullWidth>
        <LabeledTextFieldWrapper label={fieldLabel}>
          <label htmlFor={name}>
            <TextField
              error={!!formControlError}
              helperText={formControlError || ' '}
              fullWidth
              hiddenLabel
              name={name}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                // See - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
                // .currentTarget is the div in mui that emits the event, .target is the input element
                // Unfortunately, the type definitions do not let you pass a generic specifically for target, only currentTarget
                const selectionEnd = (event.target as HTMLInputElement).selectionEnd
                if (selectionEnd && formControl) {
                  formControl.cursorPosition.previous = selectionEnd
                }
              }}
              ref={ref}
              required={formControl?.required}
              size="small"
              variant="filled"
              {...props}
            />
          </label>
        </LabeledTextFieldWrapper>
      </MuiFormControl>
    )
  },
)

FormControlTextField.displayName = 'FormControlTextField'
