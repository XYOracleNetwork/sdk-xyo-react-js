import { MapSetting } from './MapSetting'

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
    label: 'Debug Logging',
    value: false,
  },
  dynamicMapResize: {
    devMode: false,
    field: 'dynamicMapResize',
    label: 'Auto Map Resize',
    value: true,
  },
  enableControls: {
    devMode: true,
    field: 'enableControls',
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
    label: 'Scroll To Zoom',
    value: false,
  },
})
