import { PackageManifestPayload } from "@xyo-network/manifest";
import { ModuleFactoryLocator } from "@xyo-network/module";

export type CreatablePackageManifest = (locator: ModuleFactoryLocator) => Promise<PackageManifestPayload>