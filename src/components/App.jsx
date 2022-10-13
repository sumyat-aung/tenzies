import React from "react";
import Dice from "./dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  function allNewDice() {
    let newDice = [];
    for (let i = 1; i < 11; i++) {
      newDice.push(generateObjOfDice());
    }
    return newDice;
  }

  let generateObjOfDice = () => ({
    value: Math.floor(Math.random() * 6 + 1),
    isHeld: false,
    id: nanoid(),
  });

  let [dice, setDice] = React.useState(allNewDice());
  let [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  let rollDice = (id) => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return {
          ...die,
          isHeld: die.id === id ? !die.isHeld : die.isHeld,
        };
      });
    });
  };

  let DiceDis = dice.map((num) => {
    return (
      <Dice
        key={num.id}
        number={num.value}
        isHeld={num.isHeld}
        click={() => rollDice(num.id)}
      />
    );
  });

  let handleRoll = () => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ? die : generateObjOfDice();
      });
    });
  };

  let newGameStart = () => {
    setDice(allNewDice());
    setTenzies(false);
  };

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-holder">{DiceDis}</div>

      {tenzies ? (
        <button type="button" onClick={newGameStart}>
          {" "}
          NEW GAME{" "}
        </button>
      ) : (
        <button type="button" onClick={handleRoll}>
          {" "}
          ROLL{" "}
        </button>
      )}

      {tenzies && <Confetti />}
    </main>
  );
}
