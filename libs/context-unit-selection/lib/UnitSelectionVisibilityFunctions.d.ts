import { UnitSelection, UnitSelectionAction } from './UnitSelectionContext';
export declare const DEFAULT_UnitS_PER_PAGE = 20;
export declare const setVisibleUnits: (s: UnitSelection, a: UnitSelectionAction) => UnitSelection;
export declare const setRestrictedUnits: (s: UnitSelection, a: UnitSelectionAction) => UnitSelection;
export declare const getVisibleUnitsOnSortUpdate: (s: UnitSelection, newOrder: (number | string)[]) => (string | number)[] | undefined;
