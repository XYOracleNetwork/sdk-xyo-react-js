import { MapSetting } from './MapSetting.js'

export const DefaultMapSettings: () => MapSetting = () => ({
  debugLayer: {
    devMode: true,
    field: 'debugLayer',
    hidden: true,
    label: 'Debug Layer',
    value: false,
  },
  debugLogging: {
    devMode: true,
    field: 'debugLogging',
    hidden: true,
    label: 'Debug Logging',
    value: false,
  },
  dynamicMapResize: {
    devMode: true,
    field: 'dynamicMapResize',
    hidden: true,
    label: 'Auto Map Resize',
    value: true,
  },
  enableControls: {
    devMode: true,
    field: 'enableControls',
    hidden: true,
    label: 'Map Controls',
    value: false,
  },
  fitToPoints: {
    devMode: true,
    field: 'fitToPoints',
    hidden: true,
    label: 'Fit To Points',
    value: false,
  },
  preferDark: {
    devMode: false,
    field: 'preferDark',
    hidden: true,
    label: 'Prefer dark',
    value: false,
  },
  scrollToZoom: {
    devMode: true,
    field: 'scrollToZoom',
    hidden: true,
    label: 'Scroll To Zoom',
    value: false,
  },
})
