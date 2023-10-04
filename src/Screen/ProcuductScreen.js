import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Component/Rating";
import Loader from "./Loader";
import apiHelper from "../Common/ApiHelper";
import ErrorMessage from "./ErrorMessage";

const ProductScreen = (props) => {
  let { setCartItems, cartItems } = props;
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({ message: "", type: "" });
  const [quantity, setQuantity] = useState(0);
  const getProduct = async () => {
    try {
      setisLoading(true);
      const result = await apiHelper.fetchProductById(id);
      if (result.status === 200) {
        setProduct(result.data.product);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.data.message) {
        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });
       
      }
      setError({
        ...error,
        message: error.message,
        type: "danger",
      });
    }
  };

  const newPrice = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(product.price);

  const AddtoCart = async () => {
    try {
      const cart = {
        product: id,
        quantity: quantity,
      };
      const findIndex = cartItems.findIndex((x) => x.product === id);
      if (findIndex > -1) {
        cartItems[findIndex].quantity = cart.quantity;
      } else {
        cartItems.push(cart);
      }
      setCartItems(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems) || "[]");
      navigate("/cart");
    } catch (error) {
      setError({
        ...error,
        message: error.message,
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getProduct(); //eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    setQuantity(product.countInStock && product.countInStock > 0 ? 1 : 0);
  }, [product]);
  const images = product?.releventImg?.map((x) => x.url);
  return (
    <div>
      <Loader isLoading={isLoading} />
      <ErrorMessage error={error} setError={setError}/>
      <Link
        to={`/`}
        className="link text-warning fs-5 d-none d-lg-block"
        style={{ fontWeight: "600", float: "right", textDecoration: "none" }}
      >
        Back To Shopping
      </Link>
      <div className="container-fluid mt-4 ">
        <div className="row">
          <div className="col g-3  mb-2 mb-md-0">
            <div className="row justify-content-between ">
              <div className="col-12 col-xl-9 d-flex justify-content-xl-end justify-content-center ">
                <img
                  src={product?.image?.url}
                  className="img-fluid"
                  alt={product.name}
                />
              </div>
              <div className="col mt-3">
                <div className="row d-none d-sm-flex justify-content-sm-center align-items-xl-end">
                  {images?.map((x) => {
                    return (
                      <div className="col-2 col-md-3 col-xl-12 mb-2 ">
                        <img
                          src={x}
                          id={product._id}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            maxHeight: "80px",
                            maxWidth: "80px",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12  mb-2 mb-0 px-0-sm">
                <h2
                  style={{ opacity: "0.8" }}
                  className="fw-bold fs-1 mt-md-0 mt-4 "
                >
                  {product.name}
                </h2>

                <p className="mb-2 d-flex justify-content-between">
                  <span className="fw-bold">
                    M.R.P. :
                    <del style={{ textDecorationColor: "red" }}>
                      {" "}
                      <i>
                        {" "}
                        <span className="fw-bold fs-5 text-secondary ">
                          {" "}
                          &#x20B9; {newPrice} /-
                        </span>
                      </i>
                    </del>
                  </span>

                  <div
                    style={{ color: "#e5b80b" }}
                    className="d-flex align-items-center justify-content-end mb-1"
                  >
                    <span>
                      <Rating rating={product.rating} />
                    </span>
                    <span>&nbsp;{product.numReviews} Reviews</span>
                  </div>
                </p>
                <p className="mb-2">
                  <p>
                    {" "}
                    <div className="d-flex  mt-3 justify-content-between">
                      <h6>
                        Special Price :
                        <span className="fw-bold">
                          &nbsp; &#x20B9; {product.totalPrice} /-
                          <i></i>
                        </span>
                      </h6>

                      <h6
                        className={` fw-bold ${
                          product.discount > 0 ? "d-flex" : "d-none"
                        } `}
                      >
                        Offer :
                        <span>
                          {product.discount}%{" "}
                          <i>
                            <span className="text-danger">off</span>
                          </i>
                        </span>
                      </h6>
                    </div>
                  </p>
                </p>

                <div className="d-flex justify-content-between mt-3 mb-3">
                  <h6>Quantity</h6>

                  <span>
                    <button
                      className="rounded"
                      disabled={quantity <= 0}
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </button>

                    <span> {quantity} </span>

                    <button
                      className="rounded"
                      disabled={
                        product.countInStock <= 0 ||
                        quantity >= product.countInStock
                      }
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </span>
                </div>

                <div className="d-flex mb-3 justify-content-between">
                  <h6>Status</h6>
                  {product.countInStock > 0 ? (
                    <span className="fs-6 success" style={{ color: "green" }}>
                      In stock
                    </span>
                  ) : (
                    <span className="fs-6 error" style={{ color: "red" }}>
                      Out of stock
                    </span>
                  )}
                </div>

                <button
                  className="btn   btn-outline-secondary w-100"
                  disabled={quantity <= 0}
                  onClick={AddtoCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn  btn-outline-primary w-100 mt-3"
                  disabled={quantity <= 0}
                  onClick={AddtoCart}
                >
                  Buy Now
                </button>

                <p className="mb-2 mt-4 fw-bold">DESCRIPTION :</p>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
