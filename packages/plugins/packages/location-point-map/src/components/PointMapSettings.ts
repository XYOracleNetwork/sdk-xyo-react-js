import { DefaultMapSettings } from '@xyo-network/react-map-model'

const PointMapSettings = DefaultMapSettings()
const { fitToPoints, enableControls } = PointMapSettings
fitToPoints.value = true
enableControls.value = true

export { PointMapSettings }
