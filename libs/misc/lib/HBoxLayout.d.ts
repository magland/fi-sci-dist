import React, { PropsWithChildren } from 'react';
type HBoxLayoutProps = {
    widths: number[];
    height: number;
    spacing?: number;
};
declare const HBoxLayout: React.FunctionComponent<PropsWithChildren<HBoxLayoutProps>>;
export default HBoxLayout;
