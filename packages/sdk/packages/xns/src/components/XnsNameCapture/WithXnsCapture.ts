import type { XnsNameCaptureProps } from './XnsNameCapture.tsx'

export type WithXnsCapture<T> = T & { XnsCapture?: React.FC<XnsNameCaptureProps> }
