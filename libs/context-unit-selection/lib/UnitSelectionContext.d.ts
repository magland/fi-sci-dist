import React from "react";
import { SortingCallback, SortingRule } from "./UnitSelectionTypes";
export type UnitSelection = {
    selectedUnitIds: Set<number | string>;
    currentUnitId: number | string | undefined;
    orderedUnitIds: (number | string)[];
    lastClickedId?: number | string;
    page?: number;
    unitsPerPage?: number;
    visibleUnitIds?: (number | string)[];
    restrictedUnitIds?: (number | string)[];
    sortRules?: SortingRule[];
};
export type UnitSelectionAction = {
    type: UnitSelectionActionType;
    incomingSelectedUnitIds?: (number | string)[];
    targetUnit?: number | string;
    newUnitOrder?: (number | string)[];
    newVisibleUnitIds?: (number | string)[];
    newRestrictedUnitIds?: (number | string)[];
    pageNumber?: number;
    unitsPerPage?: number;
    newSortField?: string;
    sortCallback?: SortingCallback;
    sourceState?: UnitSelection;
    ascending?: boolean;
};
export type UnitSelectionState = 'all' | 'none' | 'partial';
export type UnitSelectionActionType = 'SET_SELECTION' | 'UNIQUE_SELECT' | 'UNIQUE_SELECT_NEXT' | 'UNIQUE_SELECT_PREVIOUS' | 'UNIQUE_SELECT_FIRST' | 'UNIQUE_SELECT_LAST' | 'TOGGLE_UNIT' | 'TOGGLE_RANGE' | 'TOGGLE_SELECT_ALL' | 'DESELECT_ALL' | 'INITIALIZE_UNITS' | 'SET_UNIT_ORDER' | 'UPDATE_SORT_FIELDS' | 'SET_VISIBLE_UNITS' | // 'SET_WINDOW_SIZE' | 'SET_PAGE_NUMBER' |
'COPY_STATE' | 'SET_RESTRICTED_UNITS' | 'REDISTRIBUTE_UNIT_COLORS';
export declare const SET_SELECTION: UnitSelectionActionType;
export declare const UNIQUE_SELECT: UnitSelectionActionType;
export declare const UNIQUE_SELECT_NEXT: UnitSelectionActionType;
export declare const UNIQUE_SELECT_PREVIOUS: UnitSelectionActionType;
export declare const UNIQUE_SELECT_FIRST: UnitSelectionActionType;
export declare const UNIQUE_SELECT_LAST: UnitSelectionActionType;
export declare const TOGGLE_UNIT: UnitSelectionActionType;
export declare const TOGGLE_RANGE: UnitSelectionActionType;
export declare const TOGGLE_SELECT_ALL: UnitSelectionActionType;
export declare const DESELECT_ALL: UnitSelectionActionType;
export declare const INITIALIZE_UNITS: UnitSelectionActionType;
export declare const SET_UNIT_ORDER: UnitSelectionActionType;
export declare const UPDATE_SORT_FIELDS: UnitSelectionActionType;
export declare const SET_VISIBLE_UNITS: UnitSelectionActionType;
export declare const SET_RESTRICTED_UNITS: UnitSelectionActionType;
export declare const COPY_STATE: UnitSelectionActionType;
export declare const defaultUnitSelection: {
    selectedUnitIds: Set<string | number>;
    currentUnitId: undefined;
    orderedUnitIds: never[];
};
export declare const unitSelectionReducer: (s: UnitSelection, a: UnitSelectionAction) => UnitSelection;
export declare const useUnitSelection: () => {
    unitSelection: UnitSelection;
    unitSelectionDispatch: (action: UnitSelectionAction) => void;
};
declare const UnitSelectionContext: React.Context<{
    unitSelection: UnitSelection;
    unitSelectionDispatch: (action: UnitSelectionAction) => void;
}>;
export declare const useSelectedUnitIds: () => {
    selectedUnitIds: Set<string | number>;
    currentUnitId: string | number | undefined;
    orderedUnitIds: (string | number)[];
    allOrderedUnitIds: (string | number)[];
    visibleUnitIds: (string | number)[] | undefined;
    primarySortRule: SortingRule | undefined;
    page: number | undefined;
    unitsPerPage: number | undefined;
    checkboxClickHandlerGenerator: (unitId: string | number) => (evt: React.MouseEvent<Element, MouseEvent>) => void;
    plotClickHandlerGenerator: (unitId: string | number) => (evt: React.MouseEvent<Element, MouseEvent>) => void;
    unitIdSelectionDispatch: (action: UnitSelectionAction) => void;
    currentState: UnitSelection;
    restrictedUnitIds: (string | number)[] | undefined;
};
export default UnitSelectionContext;
