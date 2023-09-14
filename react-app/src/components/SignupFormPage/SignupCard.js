import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import './SignupForm.css';

function SignupFormPage({ passedEmail }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState('')
  const [input, setInput] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);




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
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
              className={errors.some((error) => error.includes("email :")) ? "inputError" : ""}
            />
          </div>

          <div className="signUpFormatB">
            Username
            <input
              type="text"
              value={username}
              placeholder="Minimum 6 characters"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>


          <div className="signUpFormatB">
            Password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            <button id='submitButtonS' type="submit" disabled={!input || username.length < 6}>Create  account</button>
          </div>
        </form >
      </div >
    </>
  );
}

export default SignupFormPage;
