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
  realTimeHighlight?: boolean;
}

export interface GridBodyProps<T extends TableDataValue> extends GridProps<T> {
  prevData: T[];
}
