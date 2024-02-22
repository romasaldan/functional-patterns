import React from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";
import { ColumnDef, TableDataValue } from "./components/Grid/types";

interface Person extends TableDataValue {
  name: string;
  lastName: string;
  age: number;
}

const rowData: Person[] = [
  {
    name: "Roman",
    lastName: "Saldan",
    age: 31,
  },
  {
    name: "Ivan",
    lastName: "Petrenko",
    age: 12,
  },

  {
    name: "Taras",
    lastName: "Karpenko",
    age: 32,
  },
  {
    name: "Andrii",
    lastName: "Himnenko",
    age: 5,
  },
  {
    name: "Andrii",
    lastName: "Kozlenko",
    age: 55,
  },
];
const columnDefs: ColumnDef<Person>[] = [
  { label: "Name", id: "name", columnValue: "name" },
  { id: "lastName", label: "Last Names", columnValue: "lastName" },
  { label: "Age", id: "age", columnValue: (value) => value.age + 1 },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Building simple grid</p>
      </header>

      <Grid data={rowData} columnDefs={columnDefs} />
    </div>
  );
}

export default App;
