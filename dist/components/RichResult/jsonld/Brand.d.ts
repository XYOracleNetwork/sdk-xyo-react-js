import AggregateRating from './AggrigateRating';
import ImageObject from './ImageObject';
import Intangible from './Intangible';
import Review from './Review';
interface Brand extends Intangible {
    aggregateRating?: AggregateRating;
    logo?: ImageObject | URL;
    review?: Review;
    slogan?: Text;
}
export default Brand;
//# sourceMappingURL=Brand.d.ts.map