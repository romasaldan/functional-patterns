import { ReactNode } from "react";
import { GridSortOptions } from "./state/reducer";

const arrowValues: Record<GridSortOptions, ReactNode> = {
  asc: <span>&uarr;</span>,
  desc: <span>&darr;</span>,
  none: <span>&uarr; &darr;</span>,
};

export const SortingIcon = ({ state }: { state: GridSortOptions }) => {
  return <>{arrowValues[state]}</>;
};
