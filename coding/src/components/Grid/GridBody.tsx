import { GridBodyProps, TableDataValue } from "./types";
import { getColumnValue } from "./utils/getColumnValue";

const cellMapping = new Map([
  [-1, "bg-danger"],
  [0, ""],
  [1, "bg-success"],
]);

export const GridBody = <T extends TableDataValue>({
  data,
  columnDefs,
  prevData,
  realTimeHighlight,
}: GridBodyProps<T>) => {
  // console.log(prevData, data, "prevData, data");

  return (
    <tbody>
      {data.map((item, index) => {
        const rowValues = columnDefs.map((def) => {
          const currentValue = getColumnValue<T>(def, item);

          if (realTimeHighlight) {
            if (data.length !== prevData.length) {
              throw Error("not correct data");
            }
            const prevItem = prevData[index];
            const prevValue = getColumnValue(def, prevItem);
            if (
              typeof prevValue === "number" &&
              typeof currentValue === "number"
            )
              return {
                text: currentValue,
                cellStyle: cellMapping.get(Math.sign(currentValue - prevValue)),
              };
          }

          return { text: currentValue };
        });

        return (
          <tr key={rowValues.map((value) => value.text).join()}>
            {rowValues.map((value) => (
              <td className={value.cellStyle} key={value.text}>
                {value.text}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};
