import React, { useState } from "react";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";
import "./Register.css";
import backgroundImage from "./bg.jpg";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleFirstname = (e) => setFirstName(e.target.value);
  const handleLastname = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("Firstname is Required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Lastname is Required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is Required");
      isValid = false;
    }
    if (phone.trim() === "") {
      setPhoneError("Phone number is Required");
      isValid = false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Password does not match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const data = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="register-form-container mt-3">
        <h2>Create an Account!</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label>Firstname</label>
          <input
            value={firstName}
            onChange={handleFirstname}
            type="text"
            className="form-control"
            placeholder="Enter your firstname"
          />
          {firstNameError && <p className="text-danger">{firstNameError}</p>}

          <label className="mt-2">Lastname</label>
          <input
            value={lastName}
            onChange={handleLastname}
            type="text"
            className="form-control"
            placeholder="Enter your lastname"
          />
          {lastNameError && <p className="text-danger">{lastNameError}</p>}

          <label className="mt-2">Email Address</label>
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            className="form-control"
            placeholder="Enter your email address"
          />
          {emailError && <p className="text-danger">{emailError}</p>}

          <label className="mt-2">Phone Number</label>
          <input
            value={phone}
            onChange={handlePhone}
            type="text"
            className="form-control"
            placeholder="Enter your phone number"
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}

          <label className="mt-2">Password</label>
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
          {passwordError && <p className="text-danger">{passwordError}</p>}

          <label className="mt-2">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            className="form-control"
            placeholder="Enter your confirm password"
          />
          {confirmPasswordError && (
            <p className="text-danger">{confirmPasswordError}</p>
          )}

          <button type="submit" className="btn btn-primary mt-2 w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
