import { Button } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { useRef } from 'react'

import { MapBoxInstanceProvider, MapSettingsProvider } from '../Contexts'
import { DefaultMapSettings } from '../Settings'
import { MapBox } from './MapBox'

const WithMapboxProviders: DecoratorFn = (Story, props) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={DefaultMapSettings()}>
        <Story {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {
    accessToken: {
      defaultValue: process.env.STORYBOOK_MAPBOX_TOKEN,
    },
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

const Template: ComponentStory<typeof MapBox> = (args) => {
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
      <Button variant="contained" sx={{ my: 2 }} onClick={handleClick}>
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

export { Default }
