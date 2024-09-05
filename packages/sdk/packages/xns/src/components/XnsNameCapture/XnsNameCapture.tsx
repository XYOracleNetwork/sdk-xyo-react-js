import { KeyboardArrowRightRounded } from '@mui/icons-material'
import type { ButtonProps, StandardTextFieldProps } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import type { UserEventHandler } from '@xylabs/pixel'
import { ButtonEx } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { Mixpanel } from 'mixpanel-browser'
import type { ReactNode } from 'react'
import React, { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { XnsEstimateNameTextField } from '../EstimateName/index.ts'
import { XnsNameCaptureErrors } from './Errors.tsx'
import { XnsCaptureSecondaryLink } from './SecondaryLink.jsx'

export interface XnsNameCaptureProps extends FlexBoxProps {
  autoFocus?: boolean
  buttonText?: string
  defaultXnsName?: string
  errorUi?: 'alert' | 'toast'
  event?: string
  funnel?: string
  hideSecondaryOption?: boolean
  mixpanel?: Mixpanel
  mobileButtonText?: string
  onBuyName?: (name: string) => void
  onEnter?: () => void
  placement?: string
  showSecondary?: boolean | ReactNode
  to?: string
  userEvents?: UserEventHandler<Record<string, unknown>>
}

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
  onEnter,
  placement = '',
  showSecondary = false,
  to = '/xns/estimation',
  userEvents,
  ...props
}) => {
  const [params] = useSearchParams()
  const [error, setError] = useState<Error | undefined>()
  const signatureParam = params.get('signature')
  const signatureParamString = signatureParam ? `&signature=${encodeURIComponent(signatureParam)}` : ''
  const [xnsName, setXnsName] = useState<string>(() => defaultXnsName ?? '')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

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
      onBuyNameProp?.(xnsName)
      navigate(`${to}?username=${xnsName}${signatureParamString}`)
    } else {
      setError(new Error(errors.join(', ')))
    }
  }, [event, funnel, mixpanel, placement, signatureParamString, to, userEvents, xnsName])

  return (
    <FlexCol gap={showSecondary ? 1.5 : 0} alignItems="center" {...props}>
      <FlexRow gap={1}>
        <XnsEstimateNameTextField
          autoFocus={autoFocus}
          label="xNS Name"
          variant="outlined"
          size="small"
          value={xnsName ?? ''}
          onKeyDown={event => event.key === 'Enter' && onEnter?.()}
          onChange={handleChange}
        />
        <ButtonEx
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
