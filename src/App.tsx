import { useState } from "react";
import { Portal } from "./components";

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
        <Portal>
          <h2>{value}</h2>
        </Portal>
      </div>
    </Portal.Host>
  );
}

export default App;
