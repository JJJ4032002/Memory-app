import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Pics from "./Pics";
import Scores from "./Scores";

function Cards() {
  const [loading, setLoading] = useState(true);
  const [picsArrived, setPicsArrived] = useState(false);
  const [Error, setError] = useState(false);
  let [ExampleArr, setExampleArr] = useState([]);
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  let [ArrTotal, setArrTotal] = useState([]);
  let [splicedArr, setSplicedArr] = useState([]);
  let [runUseEffect, setRunUseEffect] = useState(0);

  let start = 0;
  let end = 12;

  useEffect(() => {
    fetch("https://api.pexels.com/v1/search/?page=1&per_page=80&query=flower", {
      headers: {
        Authorization:
          "563492ad6f917000010000010bbc2cb4ac214d6d8ecd66c450d9526c",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Could not fetch data for that resource");
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        ArrTotal = data.photos;

        setArrTotal(ArrTotal);

        splicedArr = ArrTotal.splice(start, end);
        setSplicedArr(splicedArr);
        console.log(splicedArr.length);
        setPicsArrived(true);
        setLoading(false);
        console.log("use effect used");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        setError(true);
      });
  }, [runUseEffect]);

  let checkArr = [];
  let arrToReplace = [];

  useEffect(() => {
    checkArr = [];
    arrToReplace = [];
    console.log("USE EFFECT");
  }, [splicedArr]);

  function CheckUnique(index) {
    if (checkArr.indexOf(index) === -1) {
      checkArr.push(index);
      return splicedArr[index];
    } else {
      let index = Math.floor(splicedArr.length * Math.random());
      let elseVal = CheckUnique(index);
      return elseVal;
    }
  }

  function CurrentPic(e) {
    let checkId = e.target.parentNode.parentNode.id;
    if (ExampleArr.indexOf(checkId) === -1) {
      ExampleArr.push(checkId);
      setScore(score + 1);
    } else {
      setModal(true);
    }

    if (ExampleArr.length === splicedArr.length) {
      start = start + 12;
      end = end + 12;
      splicedArr = ArrTotal.splice(start, end);
      setSplicedArr(splicedArr);
      setExampleArr([]);
    }
  }

  function ModalBtn() {
    setRunUseEffect(runUseEffect + 1);
    setExampleArr([]);
    setScore(0);
    setModal(false);
    if (score > highScore) {
      setHighScore(score);
    } else {
      console.log("Better beat the high score nest time");
    }
  }

  function changeOrder() {
    for (let i = 0; i < splicedArr.length; i++) {
      let index = Math.floor(splicedArr.length * Math.random());
      console.log(index);
      if (checkArr.length > splicedArr.length) {
        break;
      }
      let uniqueArr = CheckUnique(index);
      arrToReplace.push(uniqueArr);
    }
    splicedArr = arrToReplace;
    console.log(arrToReplace);
    setSplicedArr(splicedArr);
  }
  return (
    <div className="container">
      <Scores Score={score} HighScore={highScore} />
      {modal && <Modal handler={ModalBtn} />}
      {loading && <h1 className="loadingHead">Loading...</h1>}
      {picsArrived && (
        <div className="CardsRendered">
          <Pics
            arr={splicedArr}
            changeOrder={changeOrder}
            checkPic={CurrentPic}
          />
        </div>
      )}
      {Error && <h1 className="loadingHead">Error...</h1>}
    </div>
  );
}

export default Cards;
