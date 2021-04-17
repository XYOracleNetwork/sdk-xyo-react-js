import Intangible from './Intangible';
import SoftwareApplication from './SoftwareApplication';
import Text from './Text';
import URL from './URL';
interface EntryPoint extends Intangible {
    actionApplication?: SoftwareApplication;
    actionPlatform?: Text | URL;
    contentType?: Text;
    encodingType?: Text;
    httpMethod?: Text;
    urlTemplate?: Text;
}
export default EntryPoint;
//# sourceMappingURL=EntryPoint.d.ts.map