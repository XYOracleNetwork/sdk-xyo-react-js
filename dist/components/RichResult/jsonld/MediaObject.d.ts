import CreativeWork from './CreativeWork';
import Text from './Text';
import URL from './URL';
interface MediaObject extends CreativeWork {
    contentSize?: Text;
    contentUrl?: URL;
    height?: any;
    width?: any;
}
export default MediaObject;
//# sourceMappingURL=MediaObject.d.ts.map