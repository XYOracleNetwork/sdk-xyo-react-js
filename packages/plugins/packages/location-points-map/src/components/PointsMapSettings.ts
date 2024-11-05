import { DefaultMapSettings } from '@xyo-network/react-map-model'

const PointsMapSettings = DefaultMapSettings()
const { fitToPoints, enableControls } = PointsMapSettings
fitToPoints.value = true
enableControls.value = true

export { PointsMapSettings }
