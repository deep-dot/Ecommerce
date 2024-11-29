import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";


const ProductDetails = () => {
const dispatch = useDispatch();
const alert = useAlert();
const { id } = useParams();
const navigate = useNavigate();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log('product.stock==', product.Stock);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { cartItems } = useSelector(state => state.cart);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    console.log('Before increase quantity==', quantity);
    setQuantity((prevQuantity) => {
      if (product.Stock < prevQuantity) {
        console.log('Reached max stock limit');
        return prevQuantity; 
      }
      return prevQuantity + 1; 
    });
    dispatch(addItemsToCart(id, quantity, product.shippingPriceOnOrder, product.taxOnOrder));
    alert.success("Item Added To Cart");
  };

  const decreaseQuantity = () => {
    console.log('Before decrease quantity==', quantity);
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) {
        console.log('Reached minimum quantity limit');
        return prevQuantity;
      }
      return prevQuantity - 1;
    });
    dispatch(removeItemsFromCart(id));
    alert.success('Item is removed')
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div className="CarouselContainer">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <div style={{
                  display: 'flex',
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                  <h2>{product.name}   </h2>
                  <div>
                    {/* <Badge color="secondary" badgeContent={quantity}> */}
                    <Badge color="secondary" badgeContent={totalCartQuantity}>
                      <ShoppingCartIcon onClick={() => navigate("/cart")} style={{ cursor: 'pointer' }} />
                    </Badge>
                  </div>
                </div>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity} disabled={quantity >= product.Stock}>+</button>
                  </div>
                  <p style={{ marginLeft: "20px", fontSize: "900" }}>&larr; Add to cart</p>

                </div>
                <p>Note: <span style={{ fontSize: '12px' }}>No shipping fee on items ordered above $1000.</span> </p>
                <p>
                  Status :
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "  OutOfStock" : "  InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
