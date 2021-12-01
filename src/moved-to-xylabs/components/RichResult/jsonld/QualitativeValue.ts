/* eslint-disable import/no-cycle */
import Enumeration from './Enumeration'
import PropertyValue from './PropertyValue'
import QuantitativeValue from './QuantitativeValue'
import StructuredValue from './StructuredValue'

interface QualitativeValue extends Enumeration {
  additionalProperty?: PropertyValue
  equal?: QualitativeValue
  greater?: QualitativeValue
  greaterOrEqual?: QualitativeValue
  lesser?: QualitativeValue
  lesserOrEqual?: QualitativeValue
  nonEqual?: QualitativeValue
  valueReference?: Enumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue
}

export default QualitativeValue
