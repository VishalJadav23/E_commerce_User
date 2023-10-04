import React from "react";
import { Link, useParams } from "react-router-dom";

export default function OrderDetials() {
  const { orderId } = useParams();
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col d-flex justify-content-center mt-5 text-center">
            <div class="card" style={{ width: "22rem" }}>
              <img src="https://static.vecteezy.com/system/resources/previews/020/146/466/non_2x/thank-you-for-your-order-badge-seal-tag-label-for-retail-small-shop-stamp-sticker-thank-customers-for-buying-products-tagline-illustration-vector.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Order Placed SuccessFull !</h5>
                <p class="card-text fw-bold text-success">Order Id : {orderId}</p>
                <Link to={"/"} class="btn btn-outline-warning">
                  Want to buy something ? Go to Home{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
