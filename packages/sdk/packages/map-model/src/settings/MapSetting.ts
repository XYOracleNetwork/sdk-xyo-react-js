export type MapSettingFields = 'debugLayer' | 'fitToPoints' | 'scrollToZoom' | 'enableControls' | 'debugLogging' | 'preferDark' | 'dynamicMapResize'

export type MapSetting = {
  [field in MapSettingFields | string]: {
    /** Setting only available when application is in developerMode */
    devMode?: boolean
    /** Machine-readable string to reference setting */
    field: string
    /** Hide the setting from the UI */
    hidden?: boolean
    /** Label in the UI */
    label: string
    /** Initial toggle value for a setting */
    value: boolean
  }
}
