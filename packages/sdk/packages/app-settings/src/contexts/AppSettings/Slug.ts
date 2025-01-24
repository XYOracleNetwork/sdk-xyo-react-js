import type { EnumValue } from '@xylabs/enum'
import { Enum } from '@xylabs/enum'

/** @deprecated import from @xylabs/react-app-settings instead */
export const AppSettingSlug = Enum({
  DarkMode: 'darkmode',
  Developer: 'developer',
  NavigationType: 'navigationType',
  NavigationCollapsed: 'navigationCollapsed',
  SeedPhrase: 'seedPhrase',
  MaxAccounts: 'maxAccounts',
})

export type AppSettingSlug = EnumValue<typeof AppSettingSlug>
