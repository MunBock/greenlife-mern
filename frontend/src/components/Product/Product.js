import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { detailsProduct } from "../../actions/product";

import "./product.css";

const Product = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(detailsProduct(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  return (
    <>
      <Link className="product-link" to="/">
        <i class="fa fa-arrow-left"></i>
        <span className="product-link-title">Back</span>
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className="product-row">
            <div>
              <img src={`${product.image}`} width="300px" height="300px" />
            </div>

            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-description">{product.description}</div>
              <div className="product-price">${product.price}</div>

              {product.numberInStock > 0 && (
                <div className="product-quantity">
                  <span>
                    <select
                      className="wrapper"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.numberInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </span>

                  <span className="product-stock">
                    {product.numberInStock > 0
                      ? `${product.numberInStock} available`
                      : "Out of Stock"}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={addToCartHandler}
                disabled={product.numberInStock === 0}
              >
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
