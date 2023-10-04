import React, { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import apiHelper from "../Common/ApiHelper";
import validation from "../Common/Validation";
import Input from "../Component/Input";
import ErrorMessage from "./ErrorMessage";

function Registration(props) {
  const [isLoading, setisLoading] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPasword: "",
  });
  const [error, setError] = useState({ message: "", type: "" });

  const [LoginError, setLoginError] = useState([]);
  const navigate = useNavigate();

  const RegisterHandler = async () => {
    try {
      setisSubmited(true);
      const ValidationResult = validation(user, "register");
      if (ValidationResult.length > 0) {
        setLoginError(ValidationResult);
        return;
      }
      setLoginError(ValidationResult);
      // setisLoading(true);
      const result = await apiHelper.userRegister(user);

      if (result && result.status === 200) {
        localStorage.setItem("UserInfo", JSON.stringify(result.data.user));
        localStorage.setItem(
          "Token",
          JSON.stringify(result?.data?.user?.token)
        );
        setisLoading(false);
        navigate("/");
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.data) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "validation Error"
        ) {
          setLoginError(error.response.data.ValidationResult);
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
    <div
      className="container "
      style={{ minHeight: "29.1rem", position: "relative" }}
    >
      <Loader isLoading={isLoading} />
      <ErrorMessage error={error} />

      <div className="row justify-content-center text-align-center p-4">
        <div
          className="col-md-6 col-12 p-5  border border-1  rounded-3"
          style={{ backgroundColor: "#DBDFEA", opacity: "0.5" }}
        >
          <div className="form mb-3">
            <Input
              type="text"
              className="form-control"
              isError={LoginError?.find((x) =>
                x.key === "firstName" ? true : false
              )}
              helperText={
                LoginError?.find((x) => x.key === "firstName")?.message
              }
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
                if (isSubmited) {
                  const ValidationResult = validation(user, "register");
                  setLoginError(ValidationResult);
                }
              }}
            />
            <label>First Name</label>
          </div>

          <div className="form mb-3">
            <Input
              type="text"
              className="form-control"
              isError={LoginError?.find((x) =>
                x.key === "lastName" ? true : false
              )}
              helperText={
                LoginError?.find((x) => x.key === "lastName")?.message
              }
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });

                if (isSubmited) {
                  const ValidationResult = validation(user, "register");
                  setLoginError(ValidationResult);
                }
              }}
            />

            <label>Last Name</label>
          </div>

          <div className="form mb-3">
            <Input
              type="email"
              className="form-control"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                if (isSubmited) {
                  const ValidationResult = validation(user, "register");
                  setLoginError(ValidationResult);
                }
              }}
              isError={LoginError?.find((x) =>
                x.key === "email" ? true : false
              )}
              helperText={LoginError?.find((x) => x.key === "email")?.message}
            />

            <label>Email address</label>
          </div>

          <div className="form mb-3">
            <Input
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                if (isSubmited) {
                  const ValidationResult = validation(user, "register");
                  setLoginError(ValidationResult);
                }
              }}
              isError={LoginError?.find((x) =>
                x.key === "password" ? true : false
              )}
              helperText={
                LoginError?.find((x) => x.key === "password")?.message
              }
              value={user.password}
              className="form-control"
            />
            <label>Password</label>
          </div>
          <div className="form mb-3">
            <Input
              type="password"
              className="form-control"
              onChange={(e) => {
                setUser({ ...user, confirmPasword: e.target.value });
                if (isSubmited) {
                  const ValidationResult = validation(user, "register");
                  setLoginError(ValidationResult);
                }
              }}
              isError={LoginError?.find((x) =>
                x.key === "confirmPasword" ? true : false
              )}
              helperText={
                LoginError?.find((x) => x.key === "confirmPasword")?.message
              }
              value={user.confirmPasword}
            />
            <label>Confirm-Password</label>
          </div>
          <button
            className="btn btn-warning text-dark w-100"
            onClick={RegisterHandler}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
