import type { EnumValue } from '@xylabs/sdk-js'
import { Enum } from '@xylabs/sdk-js'

export const SystemControlsType = Enum({
  Left: 'Left',
  Right: 'Right',
  WindowShade: 'WindowShade',
})

export type SystemControlsType = EnumValue<typeof SystemControlsType>
