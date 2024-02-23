import { Reducer, useEffect, useReducer, useRef } from "react";
import { ColumnDef, GridProps, TableDataValue } from "./types";
import { GridHeader } from "./GridHeader";
import { GridBody } from "./GridBody";
import { GridState, gridReducer, initialGridState } from "./state/reducer";
import { GridActions, GridEvents } from "./state/actions";
import { GridSortOptions } from "./utils/sortUtils";

export const Grid = <T extends TableDataValue>({
  data,
  columnDefs,
  sort = false,
  realTimeHighlight = false,
}: GridProps<T>) => {
  const prevState = useRef(data);
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
  useEffect(() => {
    dispatch({
      type: GridEvents.NewTableDataReceived,
      payload: data,
    });
    prevState.current = tableData;
  }, [data]);

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
      <GridBody
        columnDefs={colDef}
        data={tableData as T[]}
        prevData={prevState.current}
        realTimeHighlight={realTimeHighlight}
      />
    </table>
  );
};
