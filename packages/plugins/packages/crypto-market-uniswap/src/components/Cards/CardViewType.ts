import type { EnumValue } from '@xylabs/object'
import { Enum } from '@xylabs/object'

export const CardViewType = Enum({
  Static: 'static',
  Dynamic: 'dynamic',
})

export type CardViewType = EnumValue<typeof CardViewType>
