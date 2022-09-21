export type MapSettingFields = 'debugLayer' | 'fitToPoints' | 'scrollToZoom' | 'enableControls' | 'debugLogging' | 'preferDark' | 'dynamicMapResize'

export type MapSetting = {
  [field in MapSettingFields | string]: {
    value: boolean
    field: string
    label: string
    hidden?: boolean
    devMode?: boolean
  }
}
