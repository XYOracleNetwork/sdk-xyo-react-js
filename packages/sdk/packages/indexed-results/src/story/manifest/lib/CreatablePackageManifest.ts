import { PackageManifestPayload } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-model'

export type CreatablePackageManifest = (locator: ModuleFactoryLocator) => PackageManifestPayload
