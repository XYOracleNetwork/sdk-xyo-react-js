import { EventData, GeolocateControl, Map, MapLayerMouseEvent, MapLayerTouchEvent, NavigationControl } from 'mapbox-gl'

import { MapSetting } from '../Settings'

export interface MapSettingsConfig {
  debugLayerName?: string
  map: Map
  requestLocation?: boolean
  settings: MapSetting
  zoom?: number
}

/**
 * Utility class to handle changes in settings
 *
 * Methods are pure functions dedicated to map manipulation
 */
export class MapSettings {
  static geoLocateControl: GeolocateControl | undefined
  static mapListeners = {
    logData: (ev?: MapLayerMouseEvent | (MapLayerTouchEvent & EventData), map?: Map) => {
      const target = map || ev?.target
      if (target) {
        console.log('zoom', target.getZoom())
        console.log('center', target.getCenter())
      }
    },
  }
  static navControl: NavigationControl | undefined
  static requestLocation: boolean | undefined

  static toggleControls(value: boolean | undefined, map: Map, zoom?: number, requestLocation?: boolean) {
    if (value) {
      MapSettings.addControls(map, zoom, requestLocation)
    } else {
      MapSettings.removeControls(map)
    }

    return this
  }

  static toggleDebugLayer(value: boolean | undefined, map: Map, layerName: string) {
    const debugLayer = map.getLayer(layerName)
    if (debugLayer) {
      if (value) {
        map.setLayoutProperty(layerName, 'visibility', 'visible')
      } else {
        map.setLayoutProperty(layerName, 'visibility', 'none')
      }
    }

    return this
  }

  static toggleDebugLogging(value: boolean | undefined, map: Map) {
    const debugEvents = ['resize', 'zoomend', 'dragend']
    if (value) {
      // initial values
      this.mapListeners.logData(undefined, map)
      debugEvents.forEach((event) => map.on(event, this.mapListeners.logData))
    } else {
      debugEvents.forEach((event) => map.off(event, this.mapListeners.logData))
    }
  }

  static toggleScrollToZoom(value: boolean | undefined, map: Map) {
    if (value) {
      map.scrollZoom.enable()
    } else {
      map.scrollZoom.disable()
    }

    return this
  }

  static updateSettings(config: MapSettingsConfig) {
    const { settings, map, zoom, requestLocation, debugLayerName = '' } = config
    const { scrollToZoom, enableControls, debugLayer, debugLogging } = settings

    MapSettings.toggleControls(enableControls?.value, map, zoom, requestLocation)
      .toggleScrollToZoom(scrollToZoom?.value, map)
      .toggleDebugLayer(debugLayer?.value, map, debugLayerName)
      .toggleDebugLogging(debugLogging.value, map)
  }

  // Needs to be static so we ensure controls are only instantiated once
  private static addControls(map: Map, zoom?: number, requestLocation?: boolean) {
    const geolocateControl = new GeolocateControl({
      fitBoundsOptions: {
        zoom: zoom || 2,
      },
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })

    const navControl = new NavigationControl({
      showCompass: false,
    })

    this.geoLocateControl = this.geoLocateControl || geolocateControl
    this.navControl = this.navControl || navControl

    if (!map.hasControl(this.geoLocateControl)) {
      if (requestLocation) {
        map.addControl(this.geoLocateControl)
      }
    }

    if (!map.hasControl(this.navControl)) {
      map.addControl(this.navControl, 'top-left')
    }

    return this
  }

  private static removeControls(map: Map) {
    if (this.geoLocateControl && map.hasControl(this.geoLocateControl)) {
      if (this.requestLocation) {
        map.removeControl(this.geoLocateControl)
      }
    }

    if (this.navControl && map.hasControl(this.navControl)) {
      map.removeControl(this.navControl)
    }

    return this
  }
}
