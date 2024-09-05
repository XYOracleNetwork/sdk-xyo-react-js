import { ArrowForwardRounded } from '@mui/icons-material'
import { Stack } from '@mui/material'
import type { LinkExProps } from '@xylabs/react-link'
import { LinkEx } from '@xylabs/react-link'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { Dispatch } from 'react'
import React from 'react'

import type {
  XnsNameCaptureBuyCallbacks, XnsNameCaptureRoutingProps, XnsNameCaptureTrackingProps,
} from './Props.ts'

export interface XnsCaptureSecondaryLinkProps extends XnsNameCaptureTrackingProps, XnsNameCaptureRoutingProps, XnsNameCaptureBuyCallbacks, LinkExProps {
  event?: string
  funnel?: string
  placement?: string
  setError?: Dispatch<Error | undefined>
  text?: string
  xnsName: string
}

export const XnsCaptureSecondaryLink: React.FC<XnsCaptureSecondaryLinkProps> = ({
  event = 'Click to Reservation',
  funnel = 'xns',
  mixpanel,
  navigate,
  onBuyName,
  paramsString = '',
  placement = '',
  setError,
  text = 'Or make a free reservation',
  to = '/xns/reservation',
  userEvents,
  xnsName,
  ...props
}) => {
  return (
    <LinkEx
      paddingX={0}
      color="inherit"
      style={{ textDecoration: 'underline', textUnderlineOffset: '5px' }}
      onClick={async () => {
        mixpanel?.track(event, {
          Funnel: funnel,
          Placement: placement,
        })
        const formattedXnsName = `${xnsName}.xyo`
        const helper = XnsNameHelper.fromString(formattedXnsName)
        const [valid, errors] = await helper.validate()
        if (valid) {
          await userEvents?.userClick({ elementName: event, elementType: 'xns-cta' })
          navigate?.(`${to}?username=${xnsName}${paramsString}`)
          await onBuyName(xnsName)
        } else {
          setError?.(new Error(errors.join(', ')))
        }
      }}
      {...props}
    >
      <Stack flexDirection="row" gap={0.5} alignItems="center" sx={{ cursor: 'pointer' }}>
        {text}
        <ArrowForwardRounded />
      </Stack>
    </LinkEx>
  )
}
