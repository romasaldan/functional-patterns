import { Reducer, useReducer } from "react";
import { ColumnDef, GridProps, TableDataValue } from "./types";
import { GridHeader } from "./GridHeader";
import { GridBody } from "./GridBody";
import {
  GridSortOptions,
  GridState,
  gridReducer,
  initialGridState,
} from "./state/reducer";
import { GridActions, GridEvents } from "./state/actions";

export const Grid = <T extends TableDataValue>({
  data,
  columnDefs,
  sort = false,
}: GridProps<T>) => {
  const [state, dispatch] = useReducer<Reducer<GridState<T>, GridActions<T>>>(
    gridReducer,
    {
      ...initialGridState,
      tableData: data,
      initialTableData: data,
      colDef: columnDefs,
    }
  );
  const { sortState, tableData, colDef } = state;
  const onTableHeadClick = (def: ColumnDef<T>, valueState: GridSortOptions) => {
    dispatch({
      type: GridEvents.SortClick,
      payload: {
        def,
        value: valueState,
      },
    });
  };

  return (
    <table className="table">
      <GridHeader
        columnDefs={colDef}
        sort={sort}
        sortState={sortState}
        onClick={onTableHeadClick}
      />
      <GridBody columnDefs={colDef} data={tableData as T[]} />
    </table>
  );
};
