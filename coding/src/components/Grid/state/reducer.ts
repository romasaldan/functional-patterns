import { ColumnDef, TableDataValue } from "../types";
import { GridSortOptions, sortGridData } from "../utils/sortUtils";
import {
  GridActions,
  GridEvents,
  NewTableDataReceivedAction,
  SortGridAction,
} from "./actions";

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
    case GridEvents.SortClick: {
      const { payload } = action as SortGridAction<T>;
      const { def, value } = payload;
      const { sortState, initialTableData, colDef } = state;
      const newSortState: GridSortState = { ...sortState, [def.id]: value };

      return {
        ...state,
        sortState: { ...sortState, [def.id]: value },
        tableData: sortGridData(newSortState, initialTableData, colDef),
        count: state.count + 1,
      };
    }
    case GridEvents.NewTableDataReceived: {
      const { payload } = action as NewTableDataReceivedAction<T>;

      return {
        ...state,
        tableData: payload,
        initialTableData: payload,
      };
    }
    default:
      throw new Error("unsupported action");
  }
}
