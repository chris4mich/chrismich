import React from "react";
import "./Cards.scss";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Work</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              videoId="4afhia_h4dI"
              src="/images/img-1.png"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
            />
            <CardItem
              videoId="FcWC_uX0dgs"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
              src="/images/img-2.png"
            />
            <CardItem
              videoId="FcWC_uX0dgs"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
              src="/images/img-8.png"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              videoId="4afhia_h4dI"
              src="/images/img-1.png"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
            />
            <CardItem
              videoId="FcWC_uX0dgs"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
              src="/images/img-2.png"
            />
            <CardItem
              videoId="FcWC_uX0dgs"
              text="Amet venenatis urna cursus eget nunc scelerisque viverra mauris"
              label="Work"
              src="/images/img-8.png"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
