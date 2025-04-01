/// <reference types="vite/client" />
import { Button } from '@mui/material'
import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { DefaultMapSettings } from '@xyo-network/react-map-model'
import React, { useRef } from 'react'

import { MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts/index.ts'
import { MapBox } from './MapBox.tsx'
import { MapSettingsBox } from './MapSettingsComponents/index.ts'

const WithMapboxProviders: Decorator = (Story, props) => {
  const defaultSettings = DefaultMapSettings()
  defaultSettings.enableControls.hidden = false
  defaultSettings.scrollToZoom.hidden = false

  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={defaultSettings}>
        <Story {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

const WithMapSettingsDecorator: Decorator = (Story, args) => {
  return (
    <>
      <Story {...args} />
      <MapSettingsBox developerMode={true} />
    </>
  )
}

export default {
  args: { accessToken: import.meta.env.VITE_MAPBOX_TOKEN },
  component: MapBox,
  decorators: [WithMapboxProviders],
  parameters: { docs: { page: null } },
  title: 'map/Mapbox',
} as Meta

const Template: StoryFn<typeof MapBox> = (args) => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 2rem)', minWidth: '100%', position: 'relative', transition: 'min-width 300ms ease',
    }}
    >
      <MapBox {...args} />
    </div>
  )
}

const ContainerResizeTemplate: StoryFn<typeof MapBox> = (args) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleClick = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.style.minWidth
      containerRef.current.style.minWidth = containerWidth === '100%' ? '50%' : '100%'
    }
  }

  return (
    <FlexGrowCol rowGap={2} alignItems="start">
      <Button variant="contained" sx={{ my: 1 }} onClick={handleClick}>
        Toggle Container minWidth
      </Button>
      <div
        ref={containerRef}
        style={{
          minHeight: 'calc(100vh - 2rem)', minWidth: '100%', position: 'relative', transition: 'min-width 300ms ease',
        }}
      >
        <MapBox {...args} />
      </div>
    </FlexGrowCol>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithContainerResize = ContainerResizeTemplate.bind({})

const WithMapSettings = Template.bind({})
WithMapSettings.decorators = [WithMapSettingsDecorator]

export {
  Default, WithContainerResize, WithMapSettings,
}
