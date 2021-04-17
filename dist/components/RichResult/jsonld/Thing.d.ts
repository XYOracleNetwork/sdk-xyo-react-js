import Action from './Action';
import Base from './Base';
import CreativeWork from './CreativeWork';
import ImageObject from './ImageObject';
import PropertyValue from './PropertyValue';
import Text from './Text';
import URL from './URL';
interface Thing extends Base {
    additionalType?: URL;
    alternateName?: Text;
    description?: Text;
    disambiguatingDescription?: Text;
    identifier?: PropertyValue | Text | URL;
    image?: ImageObject | URL;
    mainIdentityOfPage?: CreativeWork | URL;
    name?: Text;
    potentialAction?: Action;
    sameAs?: URL;
    subjectOf?: CreativeWork | Event;
    url?: URL;
}
export default Thing;
//# sourceMappingURL=Thing.d.ts.map