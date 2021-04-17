import React, { ReactElement } from 'react';
interface Props {
    children: ReactElement | ReactElement[];
    onClose?: () => void;
    open?: boolean;
    title: string;
}
declare const MessageDialog: React.FC<Props>;
export default MessageDialog;
//# sourceMappingURL=MessageDialog.d.ts.map