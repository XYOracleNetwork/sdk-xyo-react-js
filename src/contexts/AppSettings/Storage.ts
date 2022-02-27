import { appSettingDefault } from './appSettingDefault'
import { AppSettingSlug } from './Slug'
import { AppSettingsStorageBase } from './StorageBase'

export class AppSettingsStorage extends AppSettingsStorageBase {
  constructor(prefix = 'XyoAppSettings', defaults?: Record<string, unknown>) {
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

  get network() {
    return this.getString(AppSettingSlug.Network)
  }

  set network(value: string) {
    this.setString(AppSettingSlug.Network, value)
  }

  get archive() {
    return this.getString(AppSettingSlug.Network)
  }

  set archive(value: string) {
    this.setString(AppSettingSlug.Archive, value)
  }
}
