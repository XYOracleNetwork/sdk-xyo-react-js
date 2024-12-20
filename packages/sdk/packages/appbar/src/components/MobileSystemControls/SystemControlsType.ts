import type { EnumValue } from '@xylabs/object'
import { Enum } from '@xylabs/object'

export const SystemControlsType = Enum({
  Left: 'Left',
  Right: 'Right',
  WindowShade: 'WindowShade',
})

export type SystemControlsType = EnumValue<typeof SystemControlsType>
