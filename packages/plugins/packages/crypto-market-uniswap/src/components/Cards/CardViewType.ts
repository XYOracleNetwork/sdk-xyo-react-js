import type { EnumValue } from '@xylabs/enum'
import { Enum } from '@xylabs/enum'

export const CardViewType = Enum({
  Static: 'static',
  Dynamic: 'dynamic',
})

export type CardViewType = EnumValue<typeof CardViewType>
