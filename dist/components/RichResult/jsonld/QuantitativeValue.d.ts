import Enumeration from './Enumeration';
import PropertyValue from './PropertyValue';
import QualitativeValue from './QualitativeValue';
import StructuredValue from './StructuredValue';
import URL from './URL';
interface QuantitativeValue extends Enumeration {
    additionalProperty?: PropertyValue;
    maxValue?: number;
    minValue?: number;
    unitCode?: string | URL;
    unitText?: string;
    value?: boolean | number | StructuredValue | string;
    valueReference?: Enumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue;
}
export default QuantitativeValue;
//# sourceMappingURL=QuantitativeValue.d.ts.map