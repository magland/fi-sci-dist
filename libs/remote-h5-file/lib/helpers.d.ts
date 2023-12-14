export type Canceler = {
    onCancel: (() => void)[];
};
export declare const postRemoteH5WorkerRequest: (req: any, canceler: Canceler) => Promise<any>;
