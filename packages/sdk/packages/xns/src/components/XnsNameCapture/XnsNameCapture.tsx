import { KeyboardArrowRightRounded } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useMixpanel } from '@xylabs/react-mixpanel'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import { useXyoUserEvents } from '../../../../hooks/index.ts'
// import { useXnsNameFromUri } from '../../hooks/index.ts'
import { XnsEstimateNameTextField } from '../EstimateName/index.ts'
import { XnsNameCaptureErrors } from './Errors.tsx'
import { XnsCaptureSecondaryLink } from './SecondaryLink.jsx'

export interface XnsNameCaptureProps extends FlexBoxProps {
  autoFocus?: boolean
  buttonText?: string
  errorUi?: 'alert' | 'toast'
  event?: string
  funnel?: string
  hideSecondaryOption?: boolean
  mobileButtonText?: string
  onEnter?: () => void
  placement?: string
  showSecondary?: boolean | ReactNode
  to?: string
}

export const XnsNameCapture: React.FC<XnsNameCaptureProps> = ({
  autoFocus = false,
  buttonText = 'Buy My Name',
  errorUi = 'alert',
  event = 'Click to Checkout',
  mobileButtonText = 'Buy',
  children,
  funnel = 'xns',
  placement = '',
  showSecondary = false,
  to = '/xns/estimation',
  ...props
}) => {
  const mixpanel = useMixpanel()
  // const [xnsNameFromUri] = useXnsNameFromUri()
  const [params] = useSearchParams()
  const [error, setError] = useState<Error | undefined>()
  const signatureParam = params.get('signature')
  const signatureParamString = signatureParam ? `&signature=${encodeURIComponent(signatureParam)}` : ''
  // const [xnsName, setXnsName] = useState<string>(() => xnsNameFromUri ?? '')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  // const userEvents = useXyoUserEvents()

  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    const NsName = XnsNameHelper.mask(event.target.value)
    // setXnsName(NsName)
    setError(undefined)
  }

  return (
    <FlexCol gap={showSecondary ? 1.5 : 0} alignItems="center" {...props}>
      <FlexRow gap={1}>
        <XnsEstimateNameTextField
          autoFocus={autoFocus}
          label="xNS Name"
          inputProps={{ style: { textTransform: 'lowercase' } }}
          variant="outlined"
          size="small"
          // value={xnsName ?? ''}
          onChange={handleChange}
        />
        <ButtonEx
          variant="contained"
          color="success"
          endIcon={<KeyboardArrowRightRounded />}
          onClick={async () => {
            // mixpanel?.track(event, {
            //   Funnel: funnel,
            //   Placement: placement,
            // })
            // const helper = XnsNameHelper.fromString(xnsName)
            // const [valid, errors] = await helper.validate()
            // if (valid) {
            //   await userEvents.userClick({ elementName: event, elementType: 'xns-cta' })
            //   navigate(`${to}?username=${xnsName}${signatureParamString}`)
            // } else {
            //   setError(new Error(errors.join(', ')))
            // }
          }}
        >
          {isMobile ? mobileButtonText : buttonText}
        </ButtonEx>
      </FlexRow>
      {(showSecondary === true)
        ? (
            <XnsCaptureSecondaryLink
              xnsName=""
              // xnsName={xnsName}
              placement={placement}
              funnel={funnel}
              setError={setError}
            />
          )
        : null}
      {(typeof showSecondary === 'object')
        ? showSecondary
        : null}
      {children}
      <XnsNameCaptureErrors error={error} errorUi={errorUi} resetError={() => setError(undefined)} />
    </FlexCol>
  )
}
