import { Decorator } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'

export const WithMapboxSetup: Decorator = (Story, context) => {
  return (
    <MapboxAccessTokenProvider defaultAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}>
      <Story {...context} />
    </MapboxAccessTokenProvider>
  )
}
