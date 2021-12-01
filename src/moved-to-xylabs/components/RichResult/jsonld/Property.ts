/* eslint-disable import/no-cycle */
import Class from './Class'
import Enumeration from './Enumeration'
import Intangible from './Intangible'

interface Property extends Intangible {
  domainIncludes?: Class
  inverseOf?: Property
  rangeIncludes?: Class
  supersededBy?: Class | Enumeration | Property
}

export default Property
