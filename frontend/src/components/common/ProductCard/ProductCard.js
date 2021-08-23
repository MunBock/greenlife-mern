import React, { useState } from "react";
import { Link } from "react-router-dom";

import ContentLoader from "react-content-loader";

import "./productcard.css";

const Product = ({ product }) => {
  const [loaded, setLoaded] = useState(false);

  const MyLoader = () => (
    <ContentLoader viewBox="0 0 290 180">
      <rect x="0" y="0" rx="5" ry="5" width="290" height="200" />
    </ContentLoader>
  );

  return (
    <>
      <Link to={`/product/${product._id}`} className="card">
        {loaded ? null : <MyLoader />}
        <img
          alt=""
          style={loaded ? {} : { display: "none" }}
          src={`${product.image}`}
          onLoad={() => setLoaded(true)}
          className="card-image"
        />
        <div className="card-content">
          <div className="card-name">{product.name}</div>
          <div className="card-price">${product.price}</div>
        </div>
      </Link>
    </>
  );
};

export default Product;
