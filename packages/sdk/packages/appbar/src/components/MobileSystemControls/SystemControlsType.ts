import type { EnumValue } from '@xylabs/enum'
import { Enum } from '@xylabs/enum'

export const SystemControlsType = Enum({
  Left: 'Left',
  Right: 'Right',
  WindowShade: 'WindowShade',
})

export type SystemControlsType = EnumValue<typeof SystemControlsType>
