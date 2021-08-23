import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listProduct, deleteProduct } from "../../actions/product";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import "./productlist.css";

const ProductLists = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { product } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdated } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDeleted } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct());
  }, [product]);

  useEffect(() => {
    dispatch(listProduct());
  }, [successUpdated]);

  useEffect(() => {
    dispatch(listProduct());
  }, [successDeleted]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className="product-list-top">
        <div className="product-list-top-title">Product List</div>
        <div className="product-list-top-create">
          {userInfo && userInfo.isAdmin && (
            <Link className="create-button" to="/create">
              Create
            </Link>
          )}
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="product-table-place">
          <table className="product-table-size">
            <thead className="product-table-header">
              <tr>
                <th className="product-table-product-image">Image</th>
                <th className="product-table-product-id">Product Id</th>
                <th className="product-table-product-name">Name</th>
                <th className="product-table-product-price">Price</th>
                <th className="product-table-product-stock">Number in Stock</th>
                <th className="product-table-product-description">
                  Description
                </th>
                <th className="product-table-button"></th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              {products.map((product) => (
                <tr className="product-table-content-row" key={product._id}>
                  <td className="product-table-product-image-content">
                    <img
                      src={`${product.image}`}
                      className="product-table-product-image-content-size"
                    />
                  </td>
                  <td className="product-table-product-id-content">
                    {product._id}
                  </td>
                  <td className="product-table-product-name-content">
                    {product.name}
                  </td>
                  <td className="product-table-product-price-content">
                    {product.price}
                  </td>
                  <td className="product-table-product-stock-content">
                    {product.numberInStock}
                  </td>
                  <td className="product-table-product-description-content">
                    <div className="product-table-product-description-content-box">
                      {product.description}
                    </div>
                  </td>
                  <td className="product-list-icons">
                    <div>
                      <Link className="update-link" to={`/edit/${product._id}`}>
                        <i className="fa fa-pencil fa-2x product-list-icon"></i>
                      </Link>
                      <i
                        className="fa fa-trash fa-2x product-list-icon"
                        onClick={() => deleteHandler(product._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductLists;
