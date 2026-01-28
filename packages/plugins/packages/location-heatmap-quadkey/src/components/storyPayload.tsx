import { asSchema } from '@xyo-network/payload-model'

export const quadKeyHeatMapPayload = {
  result: [
    {
      count: 50,
      density: 10,
      quadkey: '122',
    },
    {
      count: 10,
      density: 2,
      quadkey: '033',
    },
    {
      count: 110,
      density: 2,
      quadkey: '123',
    },
    {
      count: 210,
      density: 16,
      quadkey: '300',
    },
  ],
  schema: asSchema('network.xyo.location.heatmap.quadkey.answer', true),
}
