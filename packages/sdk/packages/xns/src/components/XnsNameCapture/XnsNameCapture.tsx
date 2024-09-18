import { KeyboardArrowRightRounded } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { MIN_DOMAIN_LENGTH, XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { KeyboardEventHandler } from 'react'
import React, { useCallback, useState } from 'react'

import { XnsEstimateNameTextField } from '../EstimateName/index.ts'
import { XnsNameCaptureErrors } from './Errors.tsx'
import { navigateWithUsername } from './lib/index.ts'
import type { XnsNameCaptureProps } from './Props.ts'
import { XnsCaptureSecondaryLink } from './SecondaryLink.js'

export const XnsNameCapture: React.FC<XnsNameCaptureProps> = ({
  autoFocus = false,
  buttonText = 'Buy My Name',
  children,
  defaultXnsName,
  errorUi = 'alert',
  funnel = 'xns',
  intent = 'unset',
  mobileButtonText = 'Buy',
  navigate,
  onCaptureName: onCaptureNameProp,
  onNameChange,
  paramsString = '',
  placement = '',
  routingError,
  showSecondary = false,
  to = '/xns/estimation',
  ...props
}) => {
  const [xnsName, setXnsName] = useState<string>(() => defaultXnsName ?? '')
  const [error, setError] = useState<Error | undefined>(routingError)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const captureDisabled = !xnsName || xnsName.length < MIN_DOMAIN_LENGTH

  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    const NsName = XnsNameHelper.mask(event.target.value)
    onNameChange?.(NsName)
    setXnsName(NsName)
    setError(undefined)
  }

  const onCaptureName = useCallback(async () => {
    if (captureDisabled) return
    const formattedXnsName = `${xnsName}.xyo`
    const helper = XnsNameHelper.fromString(formattedXnsName)
    const [valid, errors] = await helper.validate()
    if (valid) {
      await onCaptureNameProp?.(xnsName)

      navigateWithUsername(xnsName, paramsString, navigate, to)
    } else {
      setError(new Error(errors.join(', ')))
    }
  }, [paramsString, to, xnsName, onCaptureNameProp, navigate])

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(async (event) => {
    if (event.key === 'Enter' && !captureDisabled) {
      await onCaptureName?.()
    }
  }, [captureDisabled, onCaptureName])

  return (
    <FlexCol gap={showSecondary ? 1.5 : 0} alignItems="center" {...props}>
      <FlexRow gap={1}>
        <XnsEstimateNameTextField
          autoFocus={autoFocus}
          label="xNS Name"
          variant="outlined"
          size="small"
          value={xnsName ?? ''}
          onKeyDown={onKeyDown}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <ButtonEx
          disabled={captureDisabled}
          funnel={funnel}
          intent={intent}
          placement={placement}
          variant="contained"
          color="success"
          endIcon={<KeyboardArrowRightRounded />}
          onClick={onCaptureName}
        >
          {isMobile ? mobileButtonText : buttonText}
        </ButtonEx>
      </FlexRow>
      {(showSecondary === true)
        ? (
            <XnsCaptureSecondaryLink
              xnsName={xnsName}
              placement={placement}
              funnel={funnel}
              setError={setError}
            />
          )
        : null}
      {
        // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
        showSecondary ? showSecondary : null
      }
      {children}
      <XnsNameCaptureErrors error={error} errorUi={errorUi} resetError={() => setError(undefined)} />
    </FlexCol>
  )
}
