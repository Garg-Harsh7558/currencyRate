import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [conFrom, setConFrom] = useState("INR");
  const [conTo, setConTo] = useState("INR");
  const [rates, setRates] = useState(0);
  const [names, setNames] = useState("");
  const [color, setColor] = useState(false);
  const [options, setOptions] = useState([""]);
  const [valueAtInput, setValue] = useState(0);
  const to = useRef(null);
  const from = useRef(null);

  const handleSwap = () => {
    setConFrom(conTo);
    setConTo(conFrom);
    // to.current.value=conTo
    // from.current.value=conFrom
  };
  const calculation = () => {
    return Number(rates * valueAtInput).toFixed(3);
  };
  console.log(calculation());

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/ff7f40c44ff6bb383af60905/latest/${conFrom}`
    )
      .then((res) => res.json())
      .then((res) => {
        setRates(res.conversion_rates[conTo]);
        let arr = [];
        for (const it in res.conversion_rates) {
          arr.push(
            <option value={it} key={it}>
              {it}
            </option>
          );
        }
        setOptions(arr);
      });
  }, [conFrom, conTo]);
  // console.log(options);

  return (
    <>
      <div className="flex-col justify-center  content-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 ">
        {/* conversion from */}
        <div className="justify-center items-center flex">
          <div className="border-2 border-black w-1/3 h-24 p-2">
            <div className="flex justify-between items-center">
              From
              <select
                name="CURRENCY"
                className="border px-2 py-1 rounded"
                ref={to}
                value={conFrom}
                onChange={(e) => setConFrom(e.target.value)}
                id=""
              >
                <option value="" disabled>
                  Select Currency
                </option>
                {options}
              </select>
            </div>
            {/* input */}
            <input
              type="number"
              className="w-full mt-2 border px-2 py-1 bg-gray-100 rounded"
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
            />
          </div>
        </div>
        {/* swap button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="h-12 w-1/3 cursor-pointer bg-blue-500 text-white font-semibold rounded shadow"
          >
            SWAP
          </button>
        </div>
        {/* convert to button */}
        <div className="justify-center flex">
          <div className="border-2 border-black w-1/3 h-24 p-2">
            <div className="flex justify-between items-center">
              From
              <select
                name="CURRENCY"
                className="text-amber-900 border px-2 py-1 rounded"
                id=""
                onChange={(e) => {
                  setConTo(e.target.value);
                  console.log(rates);
                }}
                ref={from}
                value={conTo}
              >
                <option value="" disabled>
                  Select Currency
                </option>
                {options}
              </select>
            </div>
            {/* input */}
            <input
              type="number"
              className="w-full mt-2 border px-2 py-1 rounded bg-gray-100"
              value={calculation()}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
