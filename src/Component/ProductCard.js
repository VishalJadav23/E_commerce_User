import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { product } = props;

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <Link to={`/product/${product._id}`}>
        <div
          className="card p-2"
          style={{ boxShadow: "0px 0px 8px -3px inset dimgrey " }}
        >
          <img
            src={product?.image?.url}
            className="card-img-top w-100"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">{product.name} </h3>
            <p className="d-flex justify-content-between">
              <sapn style={{ color: "#27374D" }}>{product.category.name}</sapn>
              <sapn style={{ color: "#27374D" }}>
                {" "}
                <div className="col d-flex justify-content-end">
                  <span className=" text-warning">
                    <Rating rating={product.rating} />
                  </span>
                </div>
              </sapn>
            </p>
            <p className="d-flex justify-content-between">
              <sapn style={{ color: "#27374D" }}>M.R.P. </sapn>
              <sapn> &#8377; {product.price} /-</sapn>
            </p>

            <div className="row mb-1 ">
              <div className="col ">
                <span
                  className="card-text  text-center"
                  style={{ color: "#393E46" }}
                >
                  {product.brand}
                </span>
              </div>
              <div className="col d-flex justify-content-end">
                <sapn
                  className={`fw-bold ${
                    product.discount > 0 ? "d-flex" : "d-none"
                  }`}
                  style={{ color: "#9DB2BF" }}
                >
                  {product.discount}% off
                </sapn>
              </div>
            </div>

            <a href="##" className="btn btn-outline-primary w-100 mt-3">
              Let's Buy It on{" "}
              <span className="fw-bold text-danger " style={{opacity:"0.8"}}>  &#8377;{product.totalPrice}/-</span>
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
