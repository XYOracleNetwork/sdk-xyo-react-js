import CreativeWork from './CreativeWork';
import ImageObject from './ImageObject';
import Text from './Text';
import URL from './URL';
interface SoftwareApplication extends CreativeWork {
    applicationCategory?: Text | URL;
    applicationSubCategory?: Text | URL;
    applicationSuite?: Text;
    availableOnDevice?: Text;
    countriesNotSupported?: Text;
    countriesSupported?: Text;
    downloadUrl?: URL;
    featureList?: Text | URL;
    installUrl?: URL;
    memoryRequirements?: Text | URL;
    operatingSystem?: Text;
    permissions?: Text;
    processorRequiremewnts?: Text;
    releaseNotes?: Text | URL;
    screenshot?: ImageObject | URL;
    softwareAddOn?: SoftwareApplication;
    softwareHelp?: CreativeWork;
    softwareRequirements?: Text | URL;
    softwareVersion?: Text;
    storageRequirements?: Text | URL;
    supportingData?: any;
}
export default SoftwareApplication;
//# sourceMappingURL=SoftwareApplication.d.ts.map