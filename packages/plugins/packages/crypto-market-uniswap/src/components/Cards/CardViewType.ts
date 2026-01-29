import type { EnumValue } from '@xylabs/sdk-js'
import { Enum } from '@xylabs/sdk-js'

export const CardViewType = Enum({
  Static: 'static',
  Dynamic: 'dynamic',
})

export type CardViewType = EnumValue<typeof CardViewType>
