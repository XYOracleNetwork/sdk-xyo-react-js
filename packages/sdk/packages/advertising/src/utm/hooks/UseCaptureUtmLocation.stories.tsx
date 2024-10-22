import { Box, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { usePromise } from '@xylabs/react-promise'
import { Utm } from '@xyo-network/advertising-payload-plugins'
import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import { BrowserRouter, useSearchParams } from 'react-router-dom'

import { LatestUtmPayload, UtmStorageArchivist } from '../lib/index.ts'
import { useCaptureUtmLocation } from './useCaptureUtmLocation.ts'

export default { title: 'advertising/UseCaptureUtmLocation' } as Meta

const UtmStub: React.FC<PropsWithChildren> = ({ children }) => {
  const [, setParams] = useSearchParams()

  useEffect(() => {
    UtmStorageArchivist().then(async (archivist) => {
      await archivist.clear()
    }).catch(error => console.error(error))

    setParams(() => {
      const newParams = new URLSearchParams()
      newParams.set('utm_campaign', 'test-campaign')
      newParams.set('utm_content', 'test-content')
      return newParams
    })
  }, [])

  return children
}

const RouterDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <UtmStub>
      <Story />
    </UtmStub>
  </BrowserRouter>
)

const TemplateInner = ({ message }: { message: string }) => {
  const [params] = useSearchParams()

  const [payload] = usePromise(async () => await LatestUtmPayload(), [])
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', gap: 2,
    }}
    >
      <Typography>
        Stored Payload:
        <code>
          {JSON.stringify(payload, null, 2)}
        </code>
      </Typography>
      <Typography>
        {message}
        <code>
          {JSON.stringify(params.toString(), null, 2)}
        </code>
      </Typography>
    </Box>
  )
}

const Template: StoryFn = () => {
  useCaptureUtmLocation()

  return <TemplateInner message="Query Parameters (should be empty):" />
}

const TemplateWithoutClear: StoryFn = () => {
  useCaptureUtmLocation(false)

  return <TemplateInner message="Query Parameters (should NOT be empty):" />
}

const Default = Template.bind({})
Default.decorators = [RouterDecorator]

const WithNoClearAfterCapture = TemplateWithoutClear.bind({})
WithNoClearAfterCapture.decorators = [RouterDecorator]

export { Default, WithNoClearAfterCapture }
