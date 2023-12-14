import { FunctionComponent, PropsWithChildren } from 'react';
type Props = {
    visible: boolean;
    onClose?: () => void;
    overflow?: 'hidden' | 'auto';
    padding?: number;
};
declare const ModalWindow: FunctionComponent<PropsWithChildren<Props>>;
export declare const useModalWindow: () => {
    visible: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};
export default ModalWindow;
