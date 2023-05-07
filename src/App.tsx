import { useState } from "react";
import { Select } from "./Select";

import { SelectOption } from "./Select";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
      <Select multiple value={value1} options={options} onChange={(e) => setValue1(e)} />
      <br />
      <Select value={value2} options={options} onChange={(e) => setValue2(e)} />
    </>
  );
}

export default App;
