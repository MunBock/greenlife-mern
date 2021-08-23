import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SliderButton from "./SliderButton";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { getExpensiveProducts } from "../../actions/product";

import "./slideshow.css";

const SlideShow = () => {
  const productExpensive = useSelector((state) => state.productExpensive);
  const { products, loading, error } = productExpensive;

  const [slideIndex, setSlideIndex] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpensiveProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const autoplayInterval = setInterval(() => {
        setSlideIndex((index) => {
          return index + 1 === products.length + 1 ? 1 : index + 1;
        });
      }, 4000);
      return () => {
        clearInterval(autoplayInterval);
      };
    }
  }, []);

  const nextSlide = () => {
    if (slideIndex !== products.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === products.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(products.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="slider-container">
          {products.map((product, index) => {
            if (slideIndex === index + 1) {
              return (
                <div key={product._id} className="slide active">
                  <Link to={`/product/${product._id}`}>
                    <img src={`${product.image}`} />
                  </Link>
                </div>
              );
            }
          })}
          <SliderButton moveSlide={nextSlide} direction={"next"} />
          <SliderButton moveSlide={prevSlide} direction={"prev"} />

          <div className="dots-container">
            {Array.from({ length: products.length }).map((_, index) => (
              <div
                onClick={() => moveDot(index + 1)}
                className={slideIndex === index + 1 ? "dot active" : "dot"}
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SlideShow;
