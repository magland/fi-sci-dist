type UserInfo = {
    userId?: string;
    googleIdToken?: string;
};
export declare const handleSetCurrentUser: (userInfo: UserInfo) => void;
declare const useSignedIn: () => UserInfo;
export default useSignedIn;
