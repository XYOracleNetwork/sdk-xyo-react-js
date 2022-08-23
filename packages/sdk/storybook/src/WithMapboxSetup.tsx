import { DecoratorFn } from '@storybook/react'
import { MapboxAccessTokenProvider } from '@xyo-network/react-map'

export const WithMapboxSetup: DecoratorFn = (Story, context) => {
  return (
    <MapboxAccessTokenProvider defaultAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN}>
      <Story {...context} />
    </MapboxAccessTokenProvider>
  )
}
