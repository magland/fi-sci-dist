import { FunctionComponent, PropsWithChildren } from "react";
type Props = {
    onClick?: () => void;
    title?: string;
    disabled?: boolean;
    icon?: any;
    fontSize?: number;
    label?: string;
};
declare const SmallIconButton: FunctionComponent<PropsWithChildren<Props>>;
export default SmallIconButton;
