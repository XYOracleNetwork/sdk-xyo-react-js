import Enumeration from './Enumeration';
import QualitativeValue from './QualitativeValue';
import QuantitativeValue from './QuantitativeValue';
import StructuredValue from './StructuredValue';
import URL from './URL';
interface PropertyValue extends StructuredValue {
    maxValue?: number;
    measurementTechnique?: string | URL;
    minValue?: number;
    propertyId?: string | URL;
    unitCode?: string | URL;
    unitText?: string;
    value?: boolean | number | StructuredValue | string;
    valueReference?: Enumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue;
}
export default PropertyValue;
//# sourceMappingURL=PropertyValue.d.ts.map