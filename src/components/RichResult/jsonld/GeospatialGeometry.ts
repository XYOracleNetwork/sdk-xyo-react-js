/* eslint-disable import/no-cycle */

import Intangible from './Intangible'
import Place from './Place'

interface GeospatialGeometry extends Intangible {
  geoContains?: Place | GeospatialGeometry
  geoCoveredBy?: Place | GeospatialGeometry
  geoCovers?: Place | GeospatialGeometry
  geoCrosses?: Place | GeospatialGeometry
  geoDisjoint?: Place | GeospatialGeometry
  geoEquals?: Place | GeospatialGeometry
  geoIntersects?: Place | GeospatialGeometry
  geoOverlaps?: Place | GeospatialGeometry
  geoTouches?: Place | GeospatialGeometry
  geoWithin?: Place | GeospatialGeometry
}

export default GeospatialGeometry
