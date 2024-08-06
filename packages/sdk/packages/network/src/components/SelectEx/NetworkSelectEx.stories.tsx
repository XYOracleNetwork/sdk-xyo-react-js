import { Card, CardContent } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { NetworkMemoryProvider, NetworkRouteProvider, useNetwork } from '../../contexts/index.js'
import { NetworkSelectEx } from './NetworkSelectEx.js'

const StorybookEntry = {
  argTypes: {
    responsive: {
      defaultValue: false,
    },
  },
  component: NetworkSelectEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'network/NetworkSelectEx',
} as Meta<typeof NetworkSelectEx>

const NetworkConfigOutput = () => {
  const { network } = useNetwork()
  return (
    <FlexCol my={2}>
      <Card>
        <CardContent>
          <pre>{JSON.stringify(network, null, 2)}</pre>
        </CardContent>
      </Card>
    </FlexCol>
  )
}

const Template: StoryFn<typeof NetworkSelectEx> = (args) => {
  return <NetworkSelectEx {...args}></NetworkSelectEx>
}

const TemplateWithMemoryProvider: StoryFn<typeof NetworkSelectEx> = (props) => {
  return (
    <NetworkMemoryProvider>
      <NetworkSelectEx {...props}></NetworkSelectEx>
      <NetworkConfigOutput />
    </NetworkMemoryProvider>
  )
}

const TemplateWithRouteProvider: StoryFn<typeof NetworkSelectEx> = (props) => {
  const url = new URL(window.location.toString())
  url.searchParams.set('network', 'main')
  history.pushState({}, '', url)
  return (
    <BrowserRouter>
      <NetworkRouteProvider>
        <TemplateWithRouteProviderInner {...props} />
      </NetworkRouteProvider>
    </BrowserRouter>
  )
}

const TemplateWithRouteProviderInner: StoryFn<typeof NetworkSelectEx> = (props) => {
  const { network } = useNetwork()
  const [uris, setUris] = useState<(string | undefined)[]>([])

  useEffect(() => {
    setUris(previous => [...previous, network?.nodes?.find(node => node.type === 'archivist')?.uri])
  }, [network?.nodes])

  useEffect(() => {
    if (uris.length > 1) {
      throw new Error('Error: Route Provider sent multiple network uris but should only send one.')
    }
  })

  return (
    <>
      <NetworkSelectEx {...props}></NetworkSelectEx>
      {uris.map(uri => (
        <p key={uri}>{uri}</p>
      ))}
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithMemoryProvider = TemplateWithMemoryProvider.bind({})
WithMemoryProvider.args = {}

const WithRouteProvider = TemplateWithRouteProvider.bind({})
WithRouteProvider.args = {}

export { Default, WithMemoryProvider, WithRouteProvider }

export default StorybookEntry
