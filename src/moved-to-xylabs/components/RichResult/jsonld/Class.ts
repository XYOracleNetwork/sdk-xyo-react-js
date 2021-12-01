/* eslint-disable import/no-cycle */
import Enumeration from './Enumeration'
import Intangible from './Intangible'
import Property from './Property'

interface Class extends Intangible {
  supersededBy?: Class | Enumeration | Property
}

export default Class
