import { ThemeOptions } from '@material-ui/core';
import React from 'react';
interface InvertableTheme {
    options: ThemeOptions;
}
interface InvertableThemeProviderProps {
    dark?: boolean;
    invert?: boolean;
    noResponsiveFonts?: boolean;
    options?: ThemeOptions;
}
export declare const InvertableThemeContext: React.Context<InvertableTheme>;
declare const InvertableThemeProvider: React.FC<InvertableThemeProviderProps>;
export default InvertableThemeProvider;
//# sourceMappingURL=InvertableThemeProvider.d.ts.map