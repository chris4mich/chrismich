import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

function CardItem(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={props.videoId}
        onClose={() => setOpen(false)}
      />
      <li className="cards__item" onClick={() => setOpen(true)}>
        <div className="cards__item__format">
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img className="cards__item__img" alt={props.title} src={props.src} />
          </figure>
          <div className="cards__item__info">
            <span className="cards__item__meta">Watch preview</span>
            <h3 className="cards__item__title">{props.title}</h3>
            <p className="cards__item__text">{props.text}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
