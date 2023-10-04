import { useState } from "react";
import Input from "../Component/Input";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import validation from "../Common/Validation";
import CheckoutSteps from "../Component/CheckoutSteps";
import ErrorMessage from "./ErrorMessage";

export default function ShippingScreen() {
  const [error, setError] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [shippingError, setshippingError] = useState([]);
  const [isSubmited, setisSubmited] = useState(false);
  const navigate = useNavigate();
  const [address, setaddress] = useState({
    fullName: "",
    Address: "",
    mobile: "",
    city: "",
    state: "",
    email: "",
    pincode: "",
  });

  const addressHandler = () => {
    try {
      setisSubmited(true);

      const ValidationResult = validation(address, "shipping");

      if (ValidationResult.length > 0) {
        setshippingError(ValidationResult);
        return;
      }

      setIsLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}"); // userinfo get karva mate

      userInfo.Address = address;

      localStorage.setItem("userInfo", JSON.stringify(userInfo)); // userinfo ma address add karii ne uodate kari pacho LS ma store karavo che
      setIsLoading(false);

      navigate("/paymentMethod");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Validation Error"
        ) {
          setshippingError(error.response.data.validationResult);
          return;
        }

        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });
       
        return;
      } else {
        setError({
          ...error,
          message: error.message,
          type: "danger",
        });
      
      }
    }
  };

  return (
    <>
      <div className="container py-5 ">
        <CheckoutSteps signin={true} shipping={true} />
        <ErrorMessage error={error} setError={setError}/>

        <Loader isLoding={isLoading} />
      </div>
      <div className="container ">
        <form className="row g-3 mt-5 needs-validation">
          <div className="col-md-12">
            <label className="form-label">FullName</label>
            <div className="Input-group has-validation">
              <Input
                isError={
                  shippingError.find((x) => x.key === "fullName") ? true : false
                }
                helperText={
                  shippingError.find((x) => x.key === "fullName")?.message
                }
                type="text"
                value={address.fullName}
                onChange={(e) => {
                  setaddress({ ...address, fullName: e.target.value });

                  if (isSubmited) {
                    const validationResult = validation(
                      { ...address, fullName: e.target.value },
                      "shipping"
                    );

                    setshippingError(validationResult);
                  }
                }}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <Input
              isError={
                shippingError.find((x) => x.key === "Address") ? true : false
              }
              helperText={
                shippingError.find((x) => x.key === "Address")?.message
              }
              value={address.Address}
              type="text"
              className="form-control"
              onChange={(e) => {
                setaddress({ ...address, Address: e.target.value });

                if (isSubmited) {
                  const validationResult = validation(
                    { ...address, Address: e.target.value },
                    "shipping"
                  );

                  setshippingError(validationResult);
                }
              }}
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile NO.:</label>
            <Input
              type="tel"
              isError={
                shippingError.find((x) => x.key === "Mobile") ? true : false
              }
              helperText={
                shippingError.find((x) => x.key === "Mobile")?.message
              }
              value={address.mobile}
              placeholder="123-4567-890"
              onChange={(e) => {
                setaddress({ ...address, mobile: e.target.value });

                if (isSubmited) {
                  const validationResult = validation(
                    { ...address, mobile: e.target.value },
                    "shipping"
                  );

                  setshippingError(validationResult);
                }
              }}
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <Input
              type="text"
              onChange={(e) => {
                setaddress({ ...address, email: e.target.value });

                if (isSubmited) {
                  const validationResult = validation(
                    { ...address, email: e.target.value },
                    "shipping"
                  );

                  setshippingError(validationResult);
                }
              }}
              isError={
                shippingError.find((x) => x.key === "email") ? true : false
              }
              helperText={shippingError.find((x) => x.key === "email")?.message}
              value={address.email}
              placeholder="Example@gmail.com"
              className="form-control"
              id="validationCustom03"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <Input
              isError={
                shippingError.find((x) => x.key === "City") ? true : false
              }
              helperText={shippingError.find((x) => x.key === "City")?.message}
              value={address.city}
              type="text"
              className="form-control"
              onChange={(e) => {
                setaddress({ ...address, city: e.target.value });
                if (isSubmited) {
                  const validationResult = validation(
                    { ...address, city: e.target.value },
                    "shipping"
                  );
                  setshippingError(validationResult);
                }
              }}
              id="validationCustom03"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">State</label>
            <select
              className="form-select"
              id="validationCustom04"
              required
              onChange={(e) => {
                setaddress({ ...address, state: e.target.value });
              }}
            >
              <option disabled>Choose...</option>
              <option>Gujarat</option>
              <option>Jugadi</option>
              <option>Up</option>
              <option>Delhi</option>
              <option>Bombey</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Pin Code</label>
            <Input
              type="text"
              isError={
                shippingError.find((x) => x.key === "pincode") ? true : false
              }
              helperText={
                shippingError.find((x) => x.key === "pincode")?.message
              }
              value={address.pincode}
              className="form-control"
              id="validationCustom05"
              onChange={(e) => {
                setaddress({ ...address, pincode: e.target.value });
                if (isSubmited) {
                  const validationResult = validation(
                    { ...address, pincode: e.target.value },
                    "shipping"
                  );

                  setshippingError(validationResult);
                }
              }}
              required
            />
          </div>

          <div className="col-12 mt-5">
            <button
              onClick={addressHandler}
              className="btn btn-outline-warning  mb-3"
              type="button"
            >
              Order Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
