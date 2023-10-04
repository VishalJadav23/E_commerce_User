import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import CheckoutSteps from "../Component/CheckoutSteps";
import Input from "../Component/Input";
import apiHelper from "../Common/ApiHelper";
import validation from "../Common/Validation";
import ErrorMessage from "./ErrorMessage";

function LoginScreen() {
  const [isLoading, setisLoading] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState({ email: "", password: "" });
  const [LoginError, setLoginError] = useState([]);
  const [error, setError] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const redirect = location.search.split("?redirect=")[1];
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    } // eslint-disable-next-line
  }, [token]);

  const LoginHandler = async () => {
    try {
      setisSubmited(true);
      const ValidationResult = validation(user, "login");
      if (ValidationResult.length > 0) {
        setLoginError(ValidationResult);
        return;
      }
      setLoginError(ValidationResult);
      setisLoading(true);
      const result = await apiHelper.userLogin(user);
      if (result && result.data.user) {
        localStorage.setItem("userInfo", JSON.stringify(result.data.user));
        localStorage.setItem("token", JSON.stringify(result.data.user.token));
        setisLoading(false);
        if (!redirect) return navigate("/");
        navigate("/" + redirect);
      }
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
    <div className="container pt-4">
      {redirect && <CheckoutSteps signin={true} />}

      <div
        className="container"
        style={{ height: "30rem", position: "relative" }}
      >
        <Loader isLoading={isLoading} />
        <ErrorMessage error={error} setError={setError}/>

        <div
          className="row justify-content-center align-items-center"
          style={{ marginTop: "1rem" }}
        >
          <div className="col-md-6">
            <form id="userForm">
              <h3 className="mb-2 text-warning">Log In</h3>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <Input
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    if (isSubmited) {
                      const ValidationResult = validation(user, "login");
                      setLoginError(ValidationResult);
                    }
                  }}
                  isError={LoginError?.find((x) =>
                    x.key === "email" ? true : false
                  )}
                  helperText={
                    LoginError.find((x) => x.key === "email")?.message
                  }
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <Input
                  type="password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    if (isSubmited) {
                      const ValidationResult = validation(user, "login");
                      setLoginError(ValidationResult);
                    }
                  }}
                  isError={LoginError.find((x) =>
                    x.key === "password" ? true : false
                  )}
                  helperText={
                    LoginError.find((x) => x.key === "password")?.message
                  }
                  value={user.password}
                  className="form-control"
                />
              </div>

              <button
                type="button"
                onClick={LoginHandler}
                className="btn btn-primary w-100 mt-1"
              >
                Log In
              </button>
              <h6 className="text-center mt-3">or</h6>
              <Link to={"/registration"}>
                <h6 className="text-center">Create A New Account</h6>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
