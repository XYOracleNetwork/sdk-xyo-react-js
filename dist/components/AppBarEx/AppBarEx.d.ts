import { AppBarProps, ToolbarProps } from '@material-ui/core';
import { ReactElement } from 'react';
interface Props extends AppBarProps {
    container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    contextToolbar?: ReactElement<ToolbarProps>;
    systemToolbar?: ReactElement<ToolbarProps>;
}
declare const AppBarEx: React.FC<Props>;
export default AppBarEx;
//# sourceMappingURL=AppBarEx.d.ts.map