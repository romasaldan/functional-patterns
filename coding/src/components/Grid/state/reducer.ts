import { ColumnDef, TableDataValue } from "../types";
import { sortGridData } from "../utils/sortUtils";
import { GridActions, GridEvents, SortGridAction } from "./actions";

export type GridSortOptions = "asc" | "desc" | "none";
export type GridSortState = {
  [key: string]: GridSortOptions;
};
export interface GridState<T extends TableDataValue> {
  sortState: GridSortState;
  tableData: T[];
  initialTableData: T[];
  colDef: ColumnDef<T>[];
  count: number;
}

export const initialGridState = {
  sortState: {},
  tableData: [],
  initialTableData: [],
  colDef: [],
  count: 0,
};

export function gridReducer<T extends TableDataValue>(
  state: GridState<T>,
  action: GridActions<T>
): GridState<T> {
  switch (action.type) {
    case GridEvents.SortClick:
      const { payload } = action as SortGridAction<T>;
      const { def, value } = payload;
      const { sortState, initialTableData, colDef } = state;
      const newSortState: GridSortState = { ...sortState, [def.id]: value };
      console.log(newSortState);
      return {
        ...state,
        sortState: { ...sortState, [def.id]: value },
        tableData: sortGridData(newSortState, initialTableData, colDef),
        count: state.count + 1,
      };
    default:
      throw new Error("unsupported action");
  }
}
