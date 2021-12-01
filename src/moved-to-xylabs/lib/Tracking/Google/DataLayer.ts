interface GoogleDataLayerItem extends Record<string, unknown> {
  event: string
  eventCallback?: () => void
  eventTimeout?: number
}

interface WithDataLayer {
  dataLayer?: GoogleDataLayerItem[]
}

export type { GoogleDataLayerItem, WithDataLayer }
