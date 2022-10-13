import React from "react";

export default function Dice(props) {
  let styleOfDice = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="dice" style={styleOfDice} onClick={props.click}>
      <h1>{props.number}</h1>
    </div>
  );
}
