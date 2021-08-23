import React from "react";

import "./slideshow.css";

const SliderButton = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={
        direction === "next" ? "slide-button next" : "slide-button prev"
      }
    >
      <div
        className={
          direction === "next" ? "fa fa-chevron-right" : "fa fa-chevron-left"
        }
      ></div>
    </button>
  );
};

export default SliderButton;
