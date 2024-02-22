export type cellValue = string | number;

export type TableDataValue = Record<string | number, unknown>;

export interface ColumnDef<T extends TableDataValue> {
  id: string;
  label: string;
  columnValue: cellValue | ((value: T) => cellValue);
}

export interface GridProps<T extends TableDataValue> {
  data: T[];
  columnDefs: ColumnDef<T>[];
  sort?: boolean;
}
