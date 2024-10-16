import { ArrowForwardRounded } from '@mui/icons-material'
import { Stack } from '@mui/material'
import type { LinkExProps } from '@xylabs/react-link'
import { LinkEx } from '@xylabs/react-link'
import { useUserEvents } from '@xylabs/react-pixel'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { Dispatch } from 'react'
import React from 'react'

import type {
  XnsNameCaptureBuyCallbacks, XnsNameCaptureRoutingProps, XnsNameCaptureTrackingProps,
} from './Props.ts'

export type XnsCaptureSecondaryLinkProps = XnsNameCaptureTrackingProps & XnsNameCaptureRoutingProps & XnsNameCaptureBuyCallbacks & LinkExProps & {
  setError?: Dispatch<Error | undefined>
  text?: string
  xnsName: string
}

export const XnsCaptureSecondaryLink: React.FC<XnsCaptureSecondaryLinkProps> = ({
  funnel = 'xns',
  navigate,
  onCaptureName,
  paramsString = '',
  intent,
  placement = '',
  setError,
  text = 'Or make a free reservation',
  to = '/xns/reservation',
  xnsName,
  ...props
}) => {
  const userEvents = useUserEvents('warn')
  return (
    <LinkEx
      paddingX={0}
      color="inherit"
      style={{ textDecoration: 'underline', textUnderlineOffset: '5px' }}
      onClick={async () => {
        const formattedXnsName = `${xnsName}.xyo`
        const helper = XnsNameHelper.fromString(formattedXnsName)
        const [valid, errors] = await helper.validate()
        if (valid) {
          await userEvents?.userClick({
            funnel, placement, intent,
          })
          navigate?.(`${to}?username=${xnsName}${paramsString}`)
          await onCaptureName?.(xnsName)
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
