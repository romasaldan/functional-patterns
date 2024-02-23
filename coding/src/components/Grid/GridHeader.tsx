import { createCircularStatefulGenerator } from "../../utils/createStatefulGenerator";
import { SortingIcon } from "./SortingIcon";
import { GridSortState } from "./state/reducer";
import { ColumnDef, GridProps, TableDataValue } from "./types";
import { GridSortOptions } from "./utils/sortUtils";

interface GridHeaderProps<T extends TableDataValue> {
  onClick?: (def: ColumnDef<T>, value: GridSortOptions) => void;
  sort?: boolean;
  sortState?: GridSortState;
}

const sortOptions: GridSortOptions[] = ["none", "desc", "asc"];
const sortStatesGenerator = createCircularStatefulGenerator(sortOptions);

export const GridHeader = <T extends TableDataValue>({
  columnDefs,
  onClick,
  sort = false,
  sortState,
}: GridHeaderProps<T> & Pick<GridProps<T>, "columnDefs">) => {
  return (
    <thead>
      <tr>
        {columnDefs.map((def) => {
          const currentSortState = sortState?.[def.id] ?? "none";

          return (
            <th
              key={def.id}
              onClick={() => {
                if (sort) onClick?.(def, sortStatesGenerator(currentSortState));
              }}
            >
              {def.label} {sort && <SortingIcon state={currentSortState} />}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
