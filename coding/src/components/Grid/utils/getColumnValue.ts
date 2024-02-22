import { ColumnDef, TableDataValue, cellValue } from "../types";

export const getColumnValue = <T extends TableDataValue>(
  def: ColumnDef<T>,
  item: T
) =>
  typeof def.columnValue === "function"
    ? def.columnValue(item)
    : (item[def.columnValue] as cellValue);
