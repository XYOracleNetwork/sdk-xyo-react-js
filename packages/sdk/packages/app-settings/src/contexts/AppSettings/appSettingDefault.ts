import { AppSettingSlug } from './Slug'

export const appSettingDefault = (): Record<string, unknown> => {
  return {
    [AppSettingSlug.DarkMode]: false,
    [AppSettingSlug.Developer]: false,
    [AppSettingSlug.NavigationType]: 'menu',
    [AppSettingSlug.NavigationCollapsed]: false,
    [AppSettingSlug.SeedPhrase]: '',
  }
}
