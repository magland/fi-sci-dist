import { MessageToParent } from './viewInterface/MessageToParentTypes';
declare const sendMessageToParent: (x: MessageToParent, { parentOrigin }: {
    parentOrigin: string;
}) => void;
export default sendMessageToParent;
