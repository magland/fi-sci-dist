import { Dispatch } from "react";
import { TimeSelection } from "./TimeSelection";
import { TimeSelectionAction } from "./timeSelectionReducer";
export type TimeSelectionContextType = {
    state: TimeSelection;
    dispatch: Dispatch<TimeSelectionAction>;
};
export declare const TimeSelectionContext: import("react").Context<TimeSelectionContextType>;
