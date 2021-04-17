import Class from './Class';
import Intangible from './Intangible';
import Property from './Property';
interface Enumeration extends Intangible {
    supersededBy?: Class | Enumeration | Property;
}
export default Enumeration;
//# sourceMappingURL=Enumeration.d.ts.map