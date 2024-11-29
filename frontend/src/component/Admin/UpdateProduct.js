import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  deleteProductImage,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [taxOnOrder, setTaxOnOrder] = useState('');
  const [shippingPriceOnOrder, setShippingPriceOnOrder] = useState('');
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  console.log("useParams:", useParams()); 
console.log("id from useParams:", id); 
  const productId = id;
  
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {      
      setTaxOnOrder(product.taxOnOrder);
      setShippingPriceOnOrder(product.shippingPriceOnOrder);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('taxOnOrder', taxOnOrder);
    myForm.set('shippingPriceOnOrder', shippingPriceOnOrder);
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const deleteBeforeSubmitImage = (img) => {
    var imageStore = imagesPreview.filter(image => image !== img)
    setImagesPreview(imageStore);
  }

  const deleteImage = (id) => {
    for (let i = 0; i < product.images.length; i++) {
      if (id === product.images[i]._id) {
        dispatch(deleteProductImage(productId, product.images[i]._id));
      }
    }
    // window.location.reload();
    // Update the oldImages state without the deleted image
    setOldImages(oldImages.filter((img) => img._id !== id));
  }

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Edit Product</h1>

            <div>              
              <input
                type="text"
                placeholder="Tax on order"
                required
                value={taxOnOrder}
                onChange={(e) => setTaxOnOrder(e.target.value)}
              />
            </div>
            <div>              
              <input
                type="text"
                placeholder="Shipping price on order"
                required
                value={shippingPriceOnOrder}
                onChange={(e) => setShippingPriceOnOrder(e.target.value)}
              />
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate, i) => (
                  <option key={i} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            {imagesPreview.map((image, index) => (
              <div key={image.url} id="createProductFormImage">
                <img key={index} src={image} alt="Product Preview" />
                <Button
                  key={image}
                  onClick={() => deleteBeforeSubmitImage(image)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}

            {oldImages &&
              oldImages.map((img, i) => (
                <div key={img.url} id="createProductFormImage">                  
                  <img key={i} src={img.url} alt="Old Product Preview" />                  
                  <Button
                    key={img}
                    onClick={() => deleteImage(img._id)}
                  >
                    <DeleteIcon />
                  </Button>
                  
                </div>
              ))}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
