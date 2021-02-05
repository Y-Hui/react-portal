import { useEffect, useState } from "react";
import { Portal } from "./components";

function Home() {
  console.log("Render Home");
  return <h2>Home Component</h2>;
}

function App() {
  const [value, setValue] = useState("Portal Content.");

  return (
    <Portal.Host>
      <div className="App">
        <h1
          onClick={() => {
            setValue("hhhhh");
          }}
        >
          React App.
        </h1>
        <Home />
        <input type="text" onChange={(e) => setValue(e.target.value)} />
        <Portal>
          <h2>{value}</h2>
        </Portal>
      </div>
    </Portal.Host>
  );
}

export default App;
