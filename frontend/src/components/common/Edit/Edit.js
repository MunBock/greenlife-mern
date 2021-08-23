import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { updateProduct, detailsProduct } from "../../../actions/product";

import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

import { PRODUCT_UPDATE_RESET } from "../../../constants/product";
import { PRODUCT_DETAILS_RESET } from "../../../constants/product";

import "./edit.css";

const Edit = ({ match, history }) => {
  const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdated } = productUpdate;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [productId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
      setNumberInStock(product.numberInStock);
    }
  }, [product]);

  useEffect(() => {
    if (successUpdated) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productlist");
    }
  }, [successUpdated]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        image,
        description,
        price,
        numberInStock,
      })
    );
  };

  const resizeInputHandler = (element) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const changeHandler = (e) => {
    setDescription(e.target.value);
    resizeInputHandler(e);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "greenlife-image");
    setUploading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyt0z4nzi/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setUploading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="edit-place">
          <div className="edit-form">
            <form onSubmit={updateHandler} autoComplete="off">
              <div className="edit-form-title-container">
                <div className="edit-form-title">Edit product</div>
                <Link className="product-list-link" to="/admin/productlist">
                  <i className="fa fa-times fa-2x"></i>
                </Link>
              </div>
              <div className="edit-group">
                <label className="edit-label">Name *</label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="edit-input"
                />
              </div>

              <div className="edit-group">
                <label className="edit-label">Description</label>
                <textarea
                  placeholder=""
                  name="description"
                  value={description}
                  onChange={(e) => changeHandler(e)}
                  className="edit-input-textarea"
                />
              </div>

              <div className="edit-group">
                <label className="edit-label">Price *</label>
                <input
                  type="number"
                  placeholder=""
                  name="price"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="edit-input"
                />
              </div>

              <div className="edit-group">
                <label className="edit-label">Number In Stock *</label>
                <input
                  type="number"
                  placeholder=""
                  name="number in stock"
                  min="0"
                  value={numberInStock}
                  onChange={(e) => setNumberInStock(e.target.value)}
                  required
                  className="edit-input"
                />
              </div>

              <div className="edit-image-group">
                <div className="edit-image-label">Image *</div>
                <input type="file" onChange={uploadImage} />
              </div>

              {uploading ? (
                <>
                  <div className="image-uploading">Image uploading...</div>
                  <Spinner />
                </>
              ) : (
                <img src={image} className="uploaded-image" />
              )}

              {uploading ? (
                <button className="disabled-edit-button" disabled type="submit">
                  Edit
                </button>
              ) : (
                <button className="edit-button" type="submit">
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
