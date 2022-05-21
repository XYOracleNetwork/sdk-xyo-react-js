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
}
