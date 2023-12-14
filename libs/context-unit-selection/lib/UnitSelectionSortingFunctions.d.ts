import { UnitSelection, UnitSelectionAction } from './UnitSelectionContext';
import { SortingRule } from './UnitSelectionTypes';
export declare const resetUnitOrder: (s: UnitSelection, a: UnitSelectionAction) => UnitSelection;
export declare const updateSort: (s: UnitSelection, a: UnitSelectionAction) => UnitSelection;
export declare const addFieldToSortRules: (rules: SortingRule[], newField: string, ascending: boolean | undefined) => SortingRule[];
