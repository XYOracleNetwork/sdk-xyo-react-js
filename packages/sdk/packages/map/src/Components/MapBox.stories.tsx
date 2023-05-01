import { Button } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { useRef } from 'react'

import { MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts'
import { DefaultMapSettings } from '../Settings'
import { MapBox } from './MapBox'
import { MapSettings } from './MapSettingsComponents'

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
      <MapSettings developerMode={true} />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  args: {
    accessToken: process.env.STORYBOOK_MAPBOX_TOKEN,
  },
  component: MapBox,
  decorators: [WithMapboxProviders],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'map/Mapbox',
} as Meta

const Template: StoryFn<typeof MapBox> = (args) => {
  return (
    <div style={{ minHeight: 'calc(100vh - 2rem)', minWidth: '100%', position: 'relative', transition: 'min-width 300ms ease' }}>
      <MapBox {...args} />
    </div>
  )
}

const ContainerResizeTemplate: StoryFn<typeof MapBox> = (args) => {
  const containerRef = useRef<HTMLDivElement | null>()
  const handleClick = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.style.minWidth
      if (containerWidth === '100%') {
        containerRef.current.style.minWidth = '50%'
      } else {
        containerRef.current.style.minWidth = '100%'
      }
    }
  }

  return (
    <FlexGrowCol rowGap={2} alignItems="start">
      <Button variant="contained" sx={{ my: 1 }} onClick={handleClick}>
        Toggle Container minWidth
      </Button>
      <div
        ref={(ref) => (containerRef.current = ref)}
        style={{ minHeight: 'calc(100vh - 2rem)', minWidth: '100%', position: 'relative', transition: 'min-width 300ms ease' }}
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

export { Default, WithContainerResize, WithMapSettings }
