import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../Spinner/Spinner";

import { createProduct } from "../../../actions/product";

import "./create.css";

const Create = ({ history }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(
        createProduct({ name, image, description, price, numberInStock })
      );
    }
    history.push("/admin/productlist");
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
    <div className="create-place">
      <div className="create-form">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="create-form-title-container">
            <div className="create-form-title">Create product</div>
            <Link className="product-list-link" to="/admin/productlist">
              <i className="fa fa-times fa-2x"></i>
            </Link>
          </div>
          <div className="create-group">
            <label className="create-label">Name *</label>
            <input
              type="text"
              placeholder=""
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="create-input"
            />
          </div>

          <div className="create-group">
            <label className="create-label">Description</label>
            <textarea
              placeholder=""
              name="description"
              value={description}
              onChange={(e) => changeHandler(e)}
              className="create-input-textarea"
            />
          </div>

          <div className="create-group">
            <label className="create-label">Price *</label>
            <input
              type="number"
              placeholder=""
              name="price"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="create-input"
            />
          </div>

          <div className="create-group">
            <label className="create-label">Number In Stock *</label>
            <input
              type="number"
              placeholder=""
              name="number in stock"
              min="0"
              value={numberInStock}
              onChange={(e) => setNumberInStock(e.target.value)}
              required
              className="create-input"
            />
          </div>

          <div className="create-image-group">
            <label className="create-image-label">Image *</label>
            <input type="file" onChange={uploadImage} required />
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
            <button className="disabled-create-button" disabled type="submit">
              Create
            </button>
          ) : (
            <button className="create-button" type="submit">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Create;
