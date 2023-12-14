import { FigurlRequest } from "./viewInterface/FigurlRequestTypes";
import { FigurlResponseMessage } from "./viewInterface/MessageToChildTypes";
export declare const handleFigurlResponse: (msg: FigurlResponseMessage) => void;
export declare const waitForInitialization: () => Promise<{
    parentOrigin: string;
    figureId: string;
    s: string;
}>;
declare const sendRequestToParent: (request: FigurlRequest) => Promise<unknown>;
export declare const randomAlphaString: (num_chars: number) => string;
export default sendRequestToParent;
