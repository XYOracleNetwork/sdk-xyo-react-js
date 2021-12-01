/* eslint-disable @delagen/deprecation/deprecation */
/* eslint-disable import/no-cycle */
import AdministrativeArea from './AdministrativeArea'
import ContactPointOption from './ContactPointOption'
import GeoShape from './GeoShape'
import Language from './Language'
import Place from './Place'
import Product from './Product'
import Text from './Text'
import Thing from './Thing'

interface ContactPoint extends Thing {
  areaServed?: AdministrativeArea | GeoShape | Place | Text
  availableLanguages?: Language | Text
  contactOption?: ContactPointOption
  contactType?: Text
  email?: Text
  hoursAvailable?: unknown
  productsSupported?: Product | Text
  telephone?: Text
}

export default ContactPoint
