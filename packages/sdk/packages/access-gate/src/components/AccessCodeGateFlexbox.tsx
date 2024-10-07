/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import { FormControl } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import type { WithChildren } from '@xylabs/react-shared'
import React, {
  useCallback, useEffect, useState,
} from 'react'

import { CodeTextField } from './CodeTextField.tsx'

export interface AccessCodeGateFlexbox extends WithChildren, FlexBoxProps {
  onAccessCodeSuccess?: (code?: string) => void
  textFieldHelperText?: string
  userAccessCodes?: string[]
  validAccessCodes?: string[]
  validateFunction?: (codeInput?: string) => boolean
}

export const AccessCodeGateFlexbox: React.FC<AccessCodeGateFlexbox> = ({
  children,
  onAccessCodeSuccess,
  userAccessCodes,
  validAccessCodes,
  validateFunction,
  ...props
}) => {
  const [initialized, setInitialized] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [codeInput, setCodeInput] = useState<string>()
  const [validCode, setValidCode] = useState<boolean | null>(null)

  const disabled = validateFunction ? !validateFunction(codeInput) : !codeInput
  const validateCode = useCallback((accessCode: string) => (accessCode ? validAccessCodes?.includes(accessCode) : false), [validAccessCodes])

  const onEnter = () => {
    if (codeInput) {
      const granted = validateCode(codeInput)
      if (granted) {
        setValidCode(true)
        // delay success callback to ensure the ui shows success before next action
        setTimeout(() => {
          setAccessGranted(granted)
          onAccessCodeSuccess?.(codeInput)
        }, 1500)
      } else {
        setValidCode(false)
      }
    }
  }

  useEffect(() => {
    // whenever a code changes, reset the success/failure warning
    setValidCode(null)
  }, [codeInput])

  useEffect(() => {
    if (userAccessCodes) {
      const granted = userAccessCodes.some(code => validateCode(code))
      setAccessGranted(granted)
      if (granted) {
        onAccessCodeSuccess?.()
      }
    }
    setInitialized(true)
  }, [onAccessCodeSuccess, userAccessCodes, validateCode])

  return (
    <>
      {initialized
        ? accessGranted
          ? children
          : (
              <FlexGrowCol gap={2} {...props}>
                <FlexGrowRow gap={2} alignItems="start">
                  <FormControl>
                    <CodeTextField
                      codeInput={codeInput}
                      disabled={disabled}
                      label="Enter Access Code"
                      setCodeInput={setCodeInput}
                      validCode={validCode}
                      onEnter={onEnter}
                    />
                  </FormControl>
                  <FormControl>
                    <ButtonEx disabled={disabled} onClick={onEnter} variant="contained">
                      Enter
                    </ButtonEx>
                  </FormControl>
                </FlexGrowRow>
              </FlexGrowCol>
            )

        : null}
    </>
  )
}
