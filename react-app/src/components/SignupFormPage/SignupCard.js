import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const storedEmail = localStorage.getItem("userEmail");
  const [email, setEmail] = useState(storedEmail || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState('')
  const [input, setInput] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState("")

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };


  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length < 6) {
      setUsernameError("Username must be 6 characters long");
    } else {
      setUsernameError(""); 
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 6) {
      setPasswordError("Password must be more than 5 characters");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <div id="sigFul">
        <div id="sigHea">
          Create an Account
        </div>
        <div id="sigSecHe">
          Be sure to enter your legal name as it appears on your government issued ID
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors && <div className="errorText">{errors}</div>}
          </ul>
          <div className="signUpFormatA">
            <div>
              <div>
                First Name
              </div>
              <div>
                <input
                  type="firstName"
                  value={firstName}
                  placeholder="Legal First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                Last Name
              </div>
              <div>
                <input
                  type="lastName"
                  value={lastName}
                  placeholder="Legal Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="signUpFormatB">
            Email
            <input
              type="text"
              value={email}
              placeholder="Must be unique"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {console.log("ERRORS", errors)}
          </div>

          <div className="signUpFormatB">
            Username
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
              required
            />
            {usernameError && <div className="errorText">{usernameError}</div>} 
          </div>

          <div className="signUpFormatB">
            Password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <div className="errorText">{passwordError}</div>}
          </div>

          <div className="signUpFormatB">
            Confirm Password
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div id="checkboxDiv">
            <input type="checkbox" id="abcheckbox" onClick={() => setInput(!input)}></input>
            <label>I certify that I understand this is not real</label>
          </div>
          <div id='submitBuDi'>
            <button id='submitButtonS' type="submit" disabled={!input || username.length < 6 || !username || !firstName || !lastName}>Create  account</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;
