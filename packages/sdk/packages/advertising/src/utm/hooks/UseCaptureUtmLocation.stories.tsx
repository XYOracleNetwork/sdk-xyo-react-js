import { Box } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { usePromise } from '@xylabs/react-promise'
import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import { BrowserRouter, useSearchParams } from 'react-router-dom'

import { LatestUtmPayload } from '../lib/index.ts'
import { useCaptureUtmLocation } from './useCaptureUtmLocation.ts'

export default { title: 'advertising/UseCaptureUtmLocation' } as Meta

const UtmStub: React.FC<PropsWithChildren> = ({ children }) => {
  const [, setParams] = useSearchParams()

  useEffect(() => {
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

const Template: StoryFn = () => {
  useCaptureUtmLocation()

  const [payload] = usePromise(async () => {
    return await LatestUtmPayload()
  }, [])

  return <Box>{JSON.stringify(payload, null, 2)}</Box>
}

const Default = Template.bind({})
Default.decorators = [RouterDecorator]

export { Default }
