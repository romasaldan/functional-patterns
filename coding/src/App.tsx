import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";
import { ColumnDef, TableDataValue } from "./components/Grid/types";
import useScript from "./telegram/useScript";

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

type DataAttributes = {
  [K in `data-${string}`]: string;
};
interface TelegramAuthData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: string;
  hash: string;
}

export type UseScriptProps = {
  src: string;
  id: string;
  async?: boolean;
  dataAttr?: DataAttributes;
  skip?: boolean;
};

function App() {
  // console.log("render");
  const [data, setData] = useState(rowData);
  const [authorized, setAuthorized] = useState(false);
  setTimeout(() => {
    console.log(1);
    setData((rowData) =>
      rowData.map((row) => ({
        ...row,
        age: row.age + Math.sign(Math.random() - 0.5),
      }))
    );
  }, 2000);

  const dataOnauth = useCallback((user: TelegramAuthData) => {
    console.log(2);
    console.log(user);
    setAuthorized(true);
  }, []);

  useEffect(() => {
    console.log(authorized);
  }, [authorized]);

  useEffect(() => {
    //@ts-ignore
    window.TelegramLoginWidget = {
      //@ts-ignore
      dataOnauth: (user) => dataOnauth(user),
    };
  }, [dataOnauth]);

  const scriptConfig: UseScriptProps = useMemo(
    () => ({
      src: "https://telegram.org/js/telegram-widget.js?22",
      id: "romasnmail_bot",
      dataAttr: {
        "data-telegram-login": "romasnmail_bot",
        "data-onauth": "TelegramLoginWidget.dataOnauth(user)",
      },
      skip: false,
    }),
    []
  );

  const { isLoaded, ref } = useScript(scriptConfig);

  const reset = () => {
    setAuthorized(false);
  };

  useEffect(() => {
    if (isLoaded) {
      const frame = document.getElementById(`telegram-login-romasnmail_bot`);
      if (frame) {
        if (authorized) {
          frame.style.display = "none";
        } else {
          frame.style.display = "block";

          frame.style.opacity = "0";
          frame.style.position = "absolute";
          frame.style.top = "0";
          frame.style.left = "0";
        }
      }
    }
  }, [authorized, dataOnauth, isLoaded]);

  return (
    <div className="App">
      <header className="App-header">
        <p onClick={reset}>Building simple grid</p>
      </header>

      <Grid
        data={data}
        columnDefs={columnDefs}
        sort={false}
        realTimeHighlight
      />
      <div
        style={{
          background: "red",
          width: "25px",
          height: "25px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", opacity: 0 }} ref={ref}></div>
      </div>
    </div>
  );
}

export default App;
