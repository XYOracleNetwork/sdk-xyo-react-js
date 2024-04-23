import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'

export type CreatablePackageManifest = (locator: ModuleFactoryLocator) => PackageManifestPayload
