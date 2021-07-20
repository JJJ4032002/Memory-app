import React from "react";

function Scores({ Score, HighScore }) {
  return (
    <div className="flexScores">
      <div className="score">
        <p className="ScoreHead">Score : </p>
        <p className="ScoreHead">{Score}</p>
      </div>
      <div className="score">
        <p className="ScoreHead">High Score : </p>
        <p className="ScoreHead">{HighScore}</p>
      </div>
    </div>
  );
}

export default Scores;
