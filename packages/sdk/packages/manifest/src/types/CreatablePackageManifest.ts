import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'

export type CreatablePackageManifest = (locator: ModuleFactoryLocator) => PackageManifestPayload
