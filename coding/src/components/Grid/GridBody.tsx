import { GridProps, TableDataValue } from "./types";
import { getColumnValue } from "./utils/getColumnValue";

export const GridBody = <T extends TableDataValue>({
  data,
  columnDefs,
}: GridProps<T>) => {
  return (
    <tbody>
      {data.map((item) => {
        const rowValues = columnDefs.map((def) => getColumnValue<T>(def, item));

        return (
          <tr key={rowValues.join()}>
            {rowValues.map((value) => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};
