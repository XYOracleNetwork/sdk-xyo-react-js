export type MapSettingFields = 'debugLayer' | 'fitToPoints' | 'scrollToZoom' | 'enableControls' | 'debugLogging' | 'preferDark' | 'dynamicMapResize'

export type MapSetting = {
  [field in MapSettingFields | string]: {
    /** Initial toggle value for a setting */
    value: boolean
    /** Machine-readable string to reference setting */
    field: string
    /** Label in the UI */
    label: string
    /** Hide the setting from the UI */
    hidden?: boolean
    /** Setting only available when application is in developerMode */
    devMode?: boolean
  }
}
