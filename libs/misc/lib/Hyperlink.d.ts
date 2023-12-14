import { FunctionComponent, PropsWithChildren } from "react";
type Props = {
    onClick?: () => void;
    color?: string;
    disabled?: boolean;
    href?: string;
    target?: string;
};
declare const Hyperlink: FunctionComponent<PropsWithChildren<Props>>;
export default Hyperlink;
