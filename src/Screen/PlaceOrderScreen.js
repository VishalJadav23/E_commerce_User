import { useEffect, useState } from "react";
import CheckoutSteps from "../Component/CheckoutSteps";
// import { useNavigate } from "react-router-dom"
import apiHelper from "../Common/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import RazorpayPayment from "../Component/Razorpay";
import ErrorMessage from "./ErrorMessage";

export default function PlaceOrderScreen(props) {
  const location = useLocation();
  const navigate = useNavigate();

  let { cartItems, setCartItems } = props;
  const [cart, setCart] = useState([]);
  const [error, setError] = useState({ message: "", type: "" });

  const paymentMethod = location.search.split("paymentMethod=")[1];

  let shippingInfo = JSON.parse(localStorage.getItem("userInfo" || []));
  shippingInfo = shippingInfo.Address;

  useEffect(() => {
    // eslint-disable-next-line
    cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cartItems);
  }, []);

  const [SummaryDetails, setSummaryDetails] = useState({
    totalAmount: 0,
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

    while (i < cart.length) {
      if (cart[i].countInStock > 0) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].quantity * cart[i].price;
        totalProducts++;
      }
      i++;
    }

    setSummaryDetails({
      ...SummaryDetails,
      totalItems: totalItems,
      totalAmount: totalPrice,
      totalProducts: totalProducts,
    });
    // eslint-disable-next-line
  }, [cart]);

  const getCart = async () => {
    try {
      const products = cartItems.map((x) => x.product);
      const result = await apiHelper.fetchCart(products);
      const InStockItems = result.data?.result.filter(
        (x) => x.countInStock > 0
      );

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
    } catch (error) {
      setCart([]);
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

  const placeOrderHandler = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");
      const products = cart.map(({ _id, quantity, price }) => ({
        _id,
        quantity,
        price,
      }));
      const orderDetails = {
        userInfo: userInfo,
        paymentMethod: paymentMethod,
        products: products,
        shippingAddress: userInfo.Address,
        totalPrice: SummaryDetails.totalAmount,
      };
      const result = await apiHelper.placeOrder(orderDetails);
      setCartItems([]);
      if (!result.data.order.RazorpayDetails) {
        return navigate(`/OrderDetails/${result.data.order._id}`);
      } else {
        const data = result.data.order;
        const option = {
          name: data.address.fullName,
          mobile: data.address.mobile,
          Address: data.address.Address,
          apiKey: data.RazorpayDetails.apikey,
          amount: data.RazorpayDetails.amount,
          currency: data.RazorpayDetails.currency,
          razorpayOrderid: data.RazorpayDetails.id,
          orderId: data._id,
          setError: setError,
          // navigate: navigate(`/OrderDetails/${result.data.order._id}`),
        };
        RazorpayPayment(option);
        navigate(`/OrderDetails/${result.data.order._id}`)
      }
    } catch (error) {
      setError({
        ...error,
        message: error.message,
        type: "danger",
      });
    }
  };
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-4">
          <CheckoutSteps
            signin={true}
            shipping={true}
            payment={true}
            placeorder={true}
          />
          <ErrorMessage error={error} setError={setError}/>

          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4 shadow">
                <div className="card-header py-3 ">
                  <h5 className="mb-0">Review Your Order</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col  mb-lg-0">
                      <h5>Shipping Imformation</h5>
                      <div className="address d-flex mb-0 mt-4 mb-0">
                        <h6>FullName :</h6>
                        <p className="ms-3">{shippingInfo.fullName}</p>
                      </div>
                      <div
                        className="address d-flex "
                        style={{ marginTop: "-10px", marginBottom: "-20px" }}
                      >
                        <h6>Address :</h6>
                        <p className="ms-3">{shippingInfo.Address}</p>
                      </div>
                      <div
                        className="address d-flex  mb-0 mt-2 mb-0"
                        style={{ marginTop: "-10px", marginBottom: "-20px" }}
                      >
                        <h6>Phone No :</h6>
                        <p className="ms-3">{shippingInfo.mobile}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="row">
                    <div className="col  mb-lg-0">
                      <h5>Payment Imformation</h5>
                      <div className="address d-flex mb-0 mt-4 mb-0">
                        <h6>Payment Method:</h6>
                        <p className="ms-3 text-primary fw-bold fs-4">
                          {paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4 " />
                  <h5 className="mb-4">Order Imformation</h5>

                  {cart.map((x) => {
                    return (
                      <>
                        <section
                          className="h-100"
                          style={{ backgroundColor: "#eee" }}
                        >
                          <div className="container py-3 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                              <div className="col">
                                <div className="card shadow">
                                  <div className="card-body p-4">
                                    <div className="row">
                                      <div
                                        className="d-flex flex-row align-items-center text-center  justify-content-between  "
                                        key={x._id}
                                      >
                                        <div>
                                          <img
                                            src={x.image?.url}
                                            className="img-fluid rounded-3"
                                            alt="Shopping item"
                                            style={{ height: "5rem" }}
                                          />
                                        </div>
                                        <div className="ms-3 ">
                                          <h5 className="mb-3">Name</h5>
                                          <h5>{x.name}</h5>
                                        </div>
                                        <div className="ms-3 ">
                                          <h5 className="mb-3">Quantity</h5>
                                          <h5>{x.quantity}</h5>
                                        </div>
                                        <div className="ms-3 px-4">
                                          <h5 className="mb-3">Price </h5>
                                          <h5>$ {x.price}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    );
                  })}

                  <hr className="my-4" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow">
                <div className="card-header py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Items
                      <span>{SummaryDetails.totalItems}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                      Delivery
                      <span>{SummaryDetails.delivery}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                      Total
                      <span>{SummaryDetails.totalAmount}</span>
                    </li>
                    {/* <li
                                            className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>$53.98</span>
                                        </li> */}
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Order Total </strong>
                      </div>
                      <span>
                        <strong>$ {SummaryDetails.totalAmount}</strong>
                      </span>
                    </li>
                  </ul>

                  <div className="button justify-content-center ">
                    <button
                      type="button "
                      className="btn btn-warning btn-lg w-100"
                      onClick={placeOrderHandler}
                    >
                      Place your order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
