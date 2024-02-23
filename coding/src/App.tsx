import React, { useState } from "react";
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
  console.log("render");
  const [data, setData] = useState(rowData);

  setTimeout(() => {
    console.log(1);
    setData((rowData) =>
      rowData.map((row) => ({
        ...row,
        age: row.age + Math.sign(Math.random() - 0.5),
      }))
    );
  }, 2000);
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <p>Building simple grid</p>
      </header>

      <Grid
        data={data}
        columnDefs={columnDefs}
        sort={false}
        realTimeHighlight
      />
    </div>
  );
}

export default App;
