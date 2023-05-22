import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [numbersViewed, setNumbersViewed] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const timerConst = 15;
  const [timer, setTimer] = useState(timerConst);
  const [currentBall, setCurrentBall] = useState({
    number: null,
    letter: null,
  });
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const paragraphStyles = {
    width: 50,
    height: 50,
    margin: "0",
    padding: 5,
    border: "1px solid white",
  };

  function getTypeBall(number) {
    console.log(number);
    if (number >= 1 && number <= 15) {
      setCurrentBall({ number, letter: "B" });
    } else if (number > 15 && number <= 30) {
      setCurrentBall({ number, letter: "I" });
    } else if (number > 30 && number <= 45) {
      setCurrentBall({ number, letter: "N" });
    } else if (number > 45 && number <= 60) {
      setCurrentBall({ number, letter: "G" });
    } else if (number > 60 && number <= 75) {
      setCurrentBall({ number, letter: "O" });
    }
  }

  function randomNumberBall() {
    let number = Math.floor(Math.random() * 75) + 1;
    while (numbersViewed.includes(number)) {
      number = Math.floor(Math.random() * 75) + 1;
    }
    setNumbersViewed([...numbersViewed, number]);
    return number;
  }

  useEffect(() => {
    randomBingo();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (numbersViewed.length <= 74) {
        if (timer == 0) {
          setTimer(timerConst);
          getTypeBall(randomNumberBall());
        } else {
          setTimer(timer - 1);
        }
      } else {
        setIsFinished(true);
      }
    }, 1000);
  }, [timer, isFinished == false]);

  function getMaxMinNumber(maximum, minimun, array) {
    let number = Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
    while (array.includes(number)) {
      number = Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
    }
    return number;
  }

  function randomBingo() {
    let arrayData = [];
    let maximum = 15;
    let minimun = 1;

    for (let i = 0; i < 5; i++) {
      const dataArray = [];
      if (i == 0) {
        maximum = 15;
        minimun = 1;
      } else if (i == 1) {
        maximum = 30;
        minimun = 16;
      } else if (i == 2) {
        maximum = 45;
        minimun = 31;
      } else if (i == 3) {
        maximum = 60;
        minimun = 46;
      } else if (i == 4) {
        maximum = 75;
        minimun = 61;
      }

      for (let j = 0; j < 5; j++) {
        let numberCurrent = getMaxMinNumber(maximum, minimun, dataArray);
        dataArray.push(numberCurrent);
      }
      arrayData.push(dataArray.map((x) => ({ number: x, isChecked: false })));
    }
    setBingoNumbers(arrayData);
  }

  function checkBall(arrayIndex, indexItem) {
    const bingoNumbersBack = bingoNumbers;

    if (currentBall.number == bingoNumbersBack[arrayIndex][indexItem].number) {
      bingoNumbersBack[arrayIndex][indexItem].isChecked = true;
      console.log(bingoNumbersBack);
      setBingoNumbers(bingoNumbersBack);
      console.log(bingoNumbers);
    }

    if (bingoNumbers.every((x) => x.isChecked == true)) {
      setIsFinished(true);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bingo do Matheus</h1>
        <h1>Bolas Sorteadas</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numbersViewed.map((x) => {
            return <span style={{ margin: "0 5px" }}>{x}</span>;
          })}
        </div>
        <p>Tempo para a proxima bola: {timer}</p>
        <p>
          Bola Número: {currentBall && currentBall.number}, Letra:{" "}
          {currentBall && currentBall.letter}
        </p>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={paragraphStyles}>B</p>
            <p style={paragraphStyles}>I</p>
            <p style={paragraphStyles}>N</p>
            <p style={paragraphStyles}>G</p>
            <p style={paragraphStyles}>O</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {bingoNumbers &&
              bingoNumbers.map((x, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {x.map((y, indexItem) => {
                      return (
                        <p
                          onClick={() => {
                            checkBall(index, indexItem);
                          }}
                          style={{
                            ...paragraphStyles,
                            cursor: "pointer",
                            color: y.isChecked ? "red" : "white",
                          }}
                        >
                          {y?.number}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
