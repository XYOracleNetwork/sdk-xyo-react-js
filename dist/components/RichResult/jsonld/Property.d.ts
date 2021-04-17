import Class from './Class';
import Enumeration from './Enumeration';
import Intangible from './Intangible';
interface Property extends Intangible {
    domainIncludes?: Class;
    inverseOf?: Property;
    rangeIncludes?: Class;
    supersededBy?: Class | Enumeration | Property;
}
export default Property;
//# sourceMappingURL=Property.d.ts.map