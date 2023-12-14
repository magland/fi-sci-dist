declare const serviceQuery: (serviceName: string, query: any, o?: {
    includeUserId?: boolean;
}) => Promise<{
    result: any;
    binaryPayload: ArrayBuffer;
}>;
export default serviceQuery;
