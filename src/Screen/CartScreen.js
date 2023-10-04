import { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import apiHelper from "../Common/ApiHelper";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

function CartScreen(props) {
  let { cartItems, setCartItems } = props;
  const [cart, setCart] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({ message: "", type: "" });

  useEffect(() => {
    const newcartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(newcartItems); //eslint-disable-next-line
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const [SummaryDetails, setSummaryDetails] = useState({
    totalAmount: 0,
    totalDiscount: 0,
    totalItems: 0,
    totalProducts: 0,
    delivery: 0,
    text: 0,
  });

  useEffect(() => {
    let i = 0;
    let totalPrice = 0;
    let totalItems = 0;
    let totalProducts = 0;
    let totalDiscount = 0;

    while (i < cart.length) {
      if (cart[i].countInStock > 0) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].quantity * cart[i].totalPrice;
        totalDiscount += (cart[i].price * cart[i].discount) / 100;
        totalProducts++;
      }
      i++;
    }
    setSummaryDetails({
      ...SummaryDetails,
      totalItems: totalItems,
      totalAmount: totalPrice,
      totalDiscount: totalDiscount,
      totalProducts: totalProducts,
    });
    // eslint-disable-next-line
  }, [cart]);

  const getCart = async () => {
    try {
      setisLoading(true);
      const products = cartItems.map((x) => x.product);
      const result = await apiHelper.fetchCart(products);
      const InStockItems = result.data?.result;

      let i = 0;
      while (i < cartItems.length) {
        let j = 0;
        while (j < InStockItems.length) {
          if (cartItems[i].product === InStockItems[j]._id) {
            InStockItems[j].quantity = cartItems[i].quantity;
          }
          j++;
        }
        i++;
      }

      setCart(InStockItems);

      setisLoading(false);
    } catch (error) {
      setCart([]);
      setisLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
    
      return;
    }
  };
  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, []);

  const RemoveHandler = (id) => {
    cartItems = cartItems.filter((product) => product.product !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItems(cartItems);
    getCart();
  };

  const checkOutHandler = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login?redirect=shipping");
      return;
    }
    navigate("/shipping");

    localStorage.setItem("summaryInfo", JSON.stringify(SummaryDetails));
    localStorage.setItem("cartInfo", JSON.stringify(cart));
  };

  return (
    <div>
      <section
        className="overflow-hidden container"
        style={{ minHeight: "83vh" }}
      >
        <ErrorMessage error={error} setError={setError}/>

        <Loader isLoading={isLoading} />
        <div className="row justify-content-center ">

          <div className="col-md-8">
            {cart.length <= 0 ? (
              //if cart is empty
              <div className="row justify-content-center ">
                <div className="col-8">
                  <img
                    className="img-fluid"
                    src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              //if items available in cart
              cart &&
              cart.map((product, key) => {
                return (
                  <div className="container">
                    <div className="row">
                      <div className="card col-md-12 mt-3 mb-4" key={key}>
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={product?.image?.url}
                              className="img-fluid rounded-start"
                              alt={product.name}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h3 className="card-title text-success d-flex">
                                <div className="left w-75">{product.name}</div>{" "}
                                <div className="right w-25">
                                  {" "}
                                  <button
                                    className="btn  text-danger"
                                    onClick={() => RemoveHandler(product._id)}
                                  >
                                    <i className="fa-solid p-1 fa-xmark"></i>
                                  </button>
                                </div>
                              </h3>
                              <div className="main d-flex">
                                <div className="col w-50">
                                  {" "}
                                  <p className="card-text ">
                                    <span className="fw-bold">Brand :</span>{" "}
                                    {product.brand}
                                  </p>
                                  <p className="card-text ">
                                    <span className="fw-bold">Price :</span>{" "}
                                    {product.price}
                                  </p>
                                </div>
                                <div className="col w-50">
                                  {" "}
                                  <p className="card-text">
                                    <span className="fw-bold">category :</span>{" "}
                                    {product.category?.name}
                                  </p>
                                  <p className="card-text">
                                    <span className="fw-bold">Stock :</span>
                                    {product.countInStock > 0 ? (
                                      <span
                                        className="fs-6 success"
                                        style={{ color: "green" }}
                                      >
                                        In stock
                                      </span>
                                    ) : (
                                      <span
                                        className="fs-6 error"
                                        style={{ color: "red" }}
                                      >
                                        Out of stock
                                      </span>
                                    )}
                                  </p>
                                  <select
                                    disabled={product.countInStock <= 0}
                                    value={product.quantity}
                                    className="bg-gradient bg-light rounded"
                                    style={{ minWidth: "70px" }}
                                    onChange={(e) => {
                                      cart[key].quantity = Number(
                                        e.target.value
                                      );
                                      setCart([...cart]);

                                      let tmp = cart.map((x) => {
                                        return {
                                          product: product._id,
                                          quantity: product.quantity,
                                        };
                                      });

                                      localStorage.setItem(
                                        "cartItems",
                                        JSON.stringify(tmp)
                                      );
                                    }}
                                  >
                                    {[
                                      ...new Array(product.countInStock).keys(),
                                    ].map((n) => (
                                      <option value={n + 1} key={n + 1}>
                                        {n + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="col-md-4 mt-3">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{SummaryDetails.totalProducts}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    You saves
                    <span>&#8377;{SummaryDetails.totalDiscount}/-</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Total Items
                    <span>{SummaryDetails.totalItems}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>₹ {SummaryDetails.totalAmount} /-</strong>
                    </span>
                  </li>
                </ul>
                <button
                  disabled={cart.length <= 0 ? "disabled" : ""}
                  onClick={checkOutHandler}
                  className="btn btn-warning"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CartScreen;
