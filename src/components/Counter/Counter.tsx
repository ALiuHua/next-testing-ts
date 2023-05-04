import React, { useState } from "react";

export function Counter({
  defaultCount,
  description,
}: {
  defaultCount: number;
  description: string;
}) {
  const [counter, setCounter] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  return (
    <div>
      <h1>Hello React.js Testing Series Friends!!!</h1>
      <h2>
        DESC:{description} - DC:{counter}
      </h2>
      <label htmlFor="incrementor">Incrementor</label>
      <input
        value={incrementor}
        onChange={(e) => {
          setIncrementor(Number(e.target.value) || 0);
        }}
        id="incrementor"
        type="text"
      />
      <button
        onClick={() => {
          setCounter(counter - incrementor);
        }}
      >
        -
      </button>
      <span>Current Count: {counter}</span>
      <button
        onClick={() => {
          console.log(counter + incrementor);
          counter + incrementor > 35
            ? setCounter(35)
            : setCounter(counter + incrementor);
        }}
      >
        +
      </button>
    </div>
  );
}
