import { ColumnDef, TableDataValue } from "../types";
import { GridSortOptions } from "./reducer";

export enum GridEvents {
  SortClick = "SortClick",
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

export type GridActions<T extends TableDataValue> = SortGridAction<T>;
