import { FunctionComponent, PropsWithChildren } from 'react';
interface Props {
    width: number;
    height: number;
    initialPosition: number;
    positionFromRight?: boolean;
    onChange?: (newPosition: number) => void;
    gripThickness?: number;
    gripInnerThickness?: number;
    gripMargin?: number;
    adjustable?: boolean;
    direction?: 'horizontal' | 'vertical';
    hideSecondChild?: boolean;
}
declare const Splitter: FunctionComponent<PropsWithChildren<Props>>;
export default Splitter;
