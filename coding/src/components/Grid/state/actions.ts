import { ColumnDef, TableDataValue } from "../types";
import { GridSortOptions } from "../utils/sortUtils";

export enum GridEvents {
  SortClick = "SortClick",
  NewTableDataReceived = "NewTableDataReceived",
}

interface GridAction {
  type: GridEvents;
}

export interface SortGridAction<T extends TableDataValue> extends GridAction {
  payload: {
    def: ColumnDef<T>;
    value: GridSortOptions;
  };
}

export interface NewTableDataReceivedAction<T extends TableDataValue>
  extends GridAction {
  payload: T[];
}

export type GridActions<T extends TableDataValue> =
  | SortGridAction<T>
  | NewTableDataReceivedAction<T>;
