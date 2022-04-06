import { AppSettingSlug } from './Slug'

export const appSettingDefault = (): Record<string, unknown> => {
  return {
    [AppSettingSlug.DarkMode]: false,
    [AppSettingSlug.Developer]: false,
  }
}
