const validation = (data, type) => {
  let error = [];

  if (type === "register") {
    if (!data.firstName) {
      error.push({
        key: "firstName",
        message: "Required Field firstName is empty",
      });
    } else if (!/^[a-zA-Z]{2,30}$/.test(data.firstName)) {
      error.push({ key: "firstName", message: "firstName is Invalid" });
    }

    if (!data.lastName) {
      error.push({
        key: "lastName",
        message: "Required Field lastName is empty",
      });
    } else if (!/^[a-zA-Z]{2,30}$/.test(data.lastName)) {
      error.push({ key: "lastName", message: "lastName is Invalid" });
    }

    if (!data.email) {
      error.push({ key: "email", message: "Required Field email is empty" });
    }
    //regex for email validation // eslint-disable-next-line
    else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      error.push({ key: "email", message: "Invalid email" });
    }

    if (!data.password) {
      error.push({
        key: "password",
        message: "Required Field password is empty",
      });
    } // eslint-disable-next-line
    //regex for password validation // eslint-disable-next-line
    else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        data.password
      )
    ) {
      error.push({ key: "password", message: "Invalid email and password" });
    }

    if (!data.confirmPasword) {
      error.push({
        key: "confirmPasword",
        message: "Required Field confirmPasword is empty",
      });
    } else if (data.password && data.confirmPasword) {
      if (!(data.password === data.confirmPasword)) {
        error.push({ key: "confirmPasword", message: "password Not Match" });
      }
    }
  } else if (type === "shipping") {
    //For FullName Error
    if (!data.fullName) {
      error.push({ key: "fullName", message: "Please Enter fullName" });
    } else if (!/^[a-zA-Z '.-]{2,30}$/.test(data.fullName)) {
      error.push({ key: "fullName", message: "Invalid fullName" });
    }

    //For Address Error
    if (!data.Address) {
      error.push({ key: "Address", message: "Please Enter Address" }); // eslint-disable-next-line
    } else if (!/[A-Za-z'\.\-\s\,]{5,}$/.test(data.Address)) {
      error.push({ key: "Address", message: "Invalid Addresss" });
    }

    //For Mobile Number Error
    if (!data.mobile) {
      error.push({ key: "Mobile", message: "Please Enter Mobile Number" });
    } else if (!/^(\+\d{1,10}[- ]?)?\d{10}$/.test(data.mobile)) {
      error.push({ key: "Mobile", message: "Invalid Mobile Number " });
    }

    //For Mobile Number Error
    if (!data.pincode) {
      error.push({ key: "pincode", message: "Please Enter pincode Number" });
    } else if (!/^(\d{4}|\d{6})$/.test(data.pincode)) {
      error.push({ key: "pincode", message: "Invalid pincode Number " });
    }

    // For Email
    if (!data.email) {
      error.push({ key: "email", message: "Please Enter email" });
    } // eslint-disable-next-line
    else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      error.push({ key: "email", message: "Inavalid Email" });
    }

    //For City Error
    if (!data.city) {
      error.push({ key: "City", message: "Please Enter City Name" });
    } else if (!/^[a-zA-Z '.-]{2,10}$/.test(data.city)) {
      error.push({ key: "City", message: "Invalid City" });
    }
  } else {
    if (!data.email) {
      error.push({ key: "email", message: "Required Field email is empty" });
    }
    //regex for email validation
    else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      error.push({ key: "email", message: "Invalid email" });
    }

    if (!data.password) {
      error.push({
        key: "password",
        message: "Required Field password is empty",
      });
    }
    //regex for password validation
    else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        data.password
      )
    ) {
      error.push({ key: "password", message: "Invalid email and password" });
    }
  }
  return error;
};

export default validation;
