import { GridSortState } from "../state/reducer";
import { ColumnDef, TableDataValue, cellValue } from "../types";
import { getColumnValue } from "./getColumnValue";

export type GridSortOptions = "asc" | "desc" | "none";
type SortGridComparator = (prev: cellValue, next: cellValue) => number;
const standardize = (value: cellValue) =>
  typeof value === "string" ? value.toLowerCase() : value;
const comparator = (prev: cellValue, next: cellValue) => {
  if (prev === next) return 0;

  return standardize(prev) > standardize(next) ? 1 : -1;
};
const sortStrategies: Record<GridSortOptions, SortGridComparator> = {
  asc: (prev, next) => comparator(prev, next),
  desc: (prev, next) => comparator(next, prev),
  none: () => 0,
};

export const sortGridData = <T extends TableDataValue>(
  sortState: GridSortState,
  initialTableData: T[],
  colDef: ColumnDef<T>[]
) => {
  const iterableState = Object.entries(sortState);
  const tableDataToSort = [...initialTableData];

  tableDataToSort.sort((prevItem: T, nextItem: T) => {
    const result =
      iterableState
        .map(([id, sortOption]) => {
          const sortColDef = colDef.find(
            (def) => def.id === id
          ) as ColumnDef<T>;
          const prevValue = getColumnValue(sortColDef, prevItem);
          const nextValue = getColumnValue(sortColDef, nextItem);
          const sortStrategy = sortStrategies[sortOption];

          return sortStrategy(prevValue, nextValue);
        })
        .find(Math.sign) ?? 0;

    return result;
  });

  return tableDataToSort;
};
