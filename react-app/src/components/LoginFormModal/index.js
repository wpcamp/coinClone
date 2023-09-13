import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault()
    let demoEmail = 'user@demo.io'
    let demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };


  return (
    <>
      <div className="loginFormTitle">
        <h1 >Log In</h1>
      </div>
      <div>
        <form id='logInFormDi'onSubmit={handleSubmit}>
          <ul className="errorList">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div id='logInFormDivIn'>

          <label className="formLabel">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="formInput"
            />
          </label>
          <label className="formLabel">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="formInput"
            />
          </label>
          </div>
          <button type="submit" id="loginButtonC">
            Log In
          </button>
        </form>
      </div>
      <div id="demoUserButtonDiv">
        <button id="demoUserButton" onClick={handleDemoUser}>
          Log In as Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
