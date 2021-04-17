/// <reference types="react" />
import { PaperProps } from '@material-ui/core';
import BoxlikeComponentProps from '../../BoxlikeComponentProps';
import BusyComponentProps from '../../BusyComponentProps';
interface PaperBoxProps extends PaperProps, BoxlikeComponentProps, BusyComponentProps {
}
declare const PaperBox: React.FC<PaperBoxProps>;
export { PaperBox };
export type { PaperBoxProps };
//# sourceMappingURL=PaperBox.d.ts.map