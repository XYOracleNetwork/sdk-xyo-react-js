/// <reference types="react" />
import { ButtonExProps } from '../ButtonEx';
interface NumberStatusProps extends ButtonExProps {
    autoWidth?: boolean;
    children?: undefined;
    error?: Error;
    fontSize?: number;
    shorten?: string | boolean;
    title?: string;
    value?: number | string;
    width?: number;
}
declare const NumberStatus: React.FC<NumberStatusProps>;
export default NumberStatus;
//# sourceMappingURL=NumberStatus.d.ts.map