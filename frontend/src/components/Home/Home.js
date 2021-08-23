import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";
import ProductCard from "../common/ProductCard/ProductCard";

import SlideShow from "../SlideShow/SlideShow";

import { listProduct } from "../../actions/product";
import { PRODUCT_UPDATE_RESET } from "../../constants/product";

import "./home.css";

const Home = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { product } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      dispatch(listProduct());
    }
  }, [product, successUpdate, successDelete]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <SlideShow />
          <div className="home">
            <div className="home-grip">
              {products.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
