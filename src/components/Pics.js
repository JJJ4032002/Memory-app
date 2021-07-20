import React from "react";

function Pics({ arr, changeOrder, checkPic }) {
  return (
    <div className="picsContainer">
      {arr.map((e) => {
        return (
          <div key={e.id} id={e.id} className="CardBody">
            <div className="AboutPhoto">
              <p className="picsPara">Photographer</p>
              <p className="picsPara">{e.photographer}</p>
              <p className="picsPara">Photographer Account</p>
              <p className="picsPara">
                <a
                  className="link"
                  target="_blank"
                  href={e["photographer_url"]}
                  rel="noreferrer"
                >
                  Click here
                </a>
              </p>
            </div>
            <div
              onClick={(e) => {
                changeOrder();
                checkPic(e);
              }}
              className="image"
            >
              <img
                className="pexelsImage"
                width="100%"
                src={e.src.portrait}
                alt="photoimg"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Pics;
