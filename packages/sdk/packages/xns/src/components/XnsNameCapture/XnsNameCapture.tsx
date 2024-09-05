import { KeyboardArrowRightRounded } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { MIN_DOMAIN_LENGTH, XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { KeyboardEventHandler } from 'react'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { XnsEstimateNameTextField } from '../EstimateName/index.ts'
import { XnsNameCaptureErrors } from './Errors.tsx'
import type { XnsNameCaptureProps } from './Props.ts'
import { XnsCaptureSecondaryLink } from './SecondaryLink.js'

export const XnsNameCapture: React.FC<XnsNameCaptureProps> = ({
  autoFocus = false,
  buttonText = 'Buy My Name',
  children,
  defaultXnsName,
  errorUi = 'alert',
  event = 'Click to Checkout',
  funnel = 'xns',
  mixpanel,
  mobileButtonText = 'Buy',
  onBuyName: onBuyNameProp,
  paramsString = '',
  placement = '',
  showSecondary = false,
  to = '/xns/estimation',
  userEvents,
  ...props
}) => {
  const [xnsName, setXnsName] = useState<string>(() => defaultXnsName ?? '')
  const [error, setError] = useState<Error | undefined>()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const buyDisabled = !xnsName || xnsName.length < MIN_DOMAIN_LENGTH

  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    const NsName = XnsNameHelper.mask(event.target.value)
    setXnsName(NsName)
    setError(undefined)
  }

  const onBuyName = useCallback(async () => {
    mixpanel?.track(event, {
      Funnel: funnel,
      Placement: placement,
    })
    const helper = XnsNameHelper.fromString(xnsName)
    const [valid, errors] = await helper.validate()
    if (valid) {
      await userEvents?.userClick({ elementName: event, elementType: 'xns-cta' })
      await onBuyNameProp?.(xnsName)
      navigate(`${to}?username=${xnsName}${paramsString}`)
    } else {
      setError(new Error(errors.join(', ')))
    }
  }, [event, funnel, mixpanel, paramsString, placement, to, userEvents, xnsName])

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(async (event) => {
    if (event.key === 'Enter' && !buyDisabled) {
      await onBuyName?.()
    }
  }, [buyDisabled, onBuyName])

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
        />
        <ButtonEx
          disabled={buyDisabled}
          variant="contained"
          color="success"
          endIcon={<KeyboardArrowRightRounded />}
          onClick={onBuyName}
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
