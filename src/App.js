import React, { useState, useEffect } from "react";
import "./App.css";
import { getData, storeData } from "localStorage";
import { v4 as uuidv4 } from "uuid";

function App() {
  const initialState = () => getData("data") || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  useEffect(() => {
    storeData("data", state);
    const date = state.map((obj) => obj.date);
    const bmi = state.map((obj) => obj.bmi);
    let newData = { date, bmi };
    setData(newData);
  }, [state]);

  const handleChange = (val) => {
    let heightIn = val.height / 100;
    val.bmi = (val.weight / (heightIn * heightIn)).toFixed(2);
    val.id = uuidv4;
    let nVal = [...state, val];
    let len = nVal.length;
    if (len > 7) nVal = nVal.slice(1, len);
    setState(nVal);
  };

  return (
    <div className="container">
      <div className="row center">
        <h1 className="white-text"> BMI Tracker </h1>
      </div>
      <div className="row">
        <div className="col m12 s12">
          <div>
            <div className="row center">
              <h4 className="white-text">7 Day Data</h4>
            </div>
          </div>
          {getData("lastState") !== null ? (
            <div className="center">
              <button className="calculate-btn">Undo</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
