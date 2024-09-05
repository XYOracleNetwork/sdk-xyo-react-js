import { ArrowForwardRounded } from '@mui/icons-material'
import { Stack } from '@mui/material'
import type { LinkExProps } from '@xylabs/react-link'
import { LinkEx } from '@xylabs/react-link'
import { useMixpanel } from '@xylabs/react-mixpanel'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import type { Dispatch } from 'react'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import { useXyoUserEvents } from '../../../../hooks/index.ts'

export interface XnsCaptureSecondaryLinkProps extends LinkExProps {
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
  placement = '',
  setError,
  text = 'Or make a free reservation',
  to = '/xns/reservation',
  xnsName,
  ...props
}) => {
  const mixpanel = useMixpanel()
  // const userEvents = useXyoUserEvents()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const signatureParam = params.get('signature')
  const signatureParamString = signatureParam ? `&signature=${encodeURIComponent(signatureParam)}` : ''
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
        const helper = XnsNameHelper.fromString(xnsName)
        const [valid, errors] = await helper.validate()
        if (valid) {
          // await userEvents.userClick({ elementName: event, elementType: 'xns-cta' })
          navigate(`${to}?username=${xnsName}${signatureParamString}`)
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
