import { BoxProps } from '@material-ui/core';
import { ReactElement } from 'react';
interface Props extends BoxProps {
    logo?: string | ReactElement;
    titles: string[];
}
declare const BreadcrumbToolbar: React.FC<Props>;
export default BreadcrumbToolbar;
//# sourceMappingURL=BreadcrumbToolbar.d.ts.map