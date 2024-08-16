import type { WebAppNavigationType } from '../../WebAppNavigationType.ts'
import { appSettingDefault } from './appSettingDefault.ts'
import { AppSettingSlug } from './Slug.ts'
import { AppSettingsStorageBase } from './StorageBase.ts'

export class AppSettingsStorage extends AppSettingsStorageBase {
  constructor(prefix = 'AppSettings', defaults?: Record<string, unknown>) {
    super(prefix, { ...appSettingDefault(), ...defaults })
  }

  get darkMode() {
    return this.getBoolean(AppSettingSlug.DarkMode)
  }

  set darkMode(value: boolean) {
    this.setBoolean(AppSettingSlug.DarkMode, value)
  }

  get developerMode() {
    return this.getBoolean(AppSettingSlug.Developer)
  }

  set developerMode(value: boolean) {
    this.setBoolean(AppSettingSlug.Developer, value)
  }

  get maxAccounts() {
    return this.getNumber(AppSettingSlug.MaxAccounts)
  }

  set maxAccounts(value: number) {
    this.setNumber(AppSettingSlug.MaxAccounts, value)
  }

  get navigationCollapsed() {
    return this.getBoolean(AppSettingSlug.NavigationCollapsed)
  }

  set navigationCollapsed(value: boolean) {
    this.setBoolean(AppSettingSlug.NavigationCollapsed, value)
  }

  get navigationType() {
    return this.getString(AppSettingSlug.NavigationType) as WebAppNavigationType
  }

  set navigationType(value: WebAppNavigationType) {
    this.setString(AppSettingSlug.NavigationType, value)
  }

  get seedPhrase() {
    return this.getString(AppSettingSlug.SeedPhrase)
  }

  set seedPhrase(value: string) {
    this.setString(AppSettingSlug.SeedPhrase, value)
  }
}
