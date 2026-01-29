import type { EnumValue } from '@xylabs/sdk-js'
import { Enum } from '@xylabs/sdk-js'

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
