import { WebAppNavigationType } from '../../WebAppNavigationType'
import { appSettingDefault } from './appSettingDefault'
import { AppSettingSlug } from './Slug'
import { AppSettingsStorageBase } from './StorageBase'

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
