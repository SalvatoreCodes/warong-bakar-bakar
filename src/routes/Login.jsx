import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import ErrorPopup from "../components/ErrorPopup";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        <ErrorPopup error={errorCode} />;
      });
  };

  return (
    <div className="login--container">
      <Link className="go--back" to={"/"}>
        Go back
      </Link>
      <div className="login">
        <h1>Login</h1>
        <form noValidate>
          <input
            type="text"
            required
            placeholder="Email address"
            onChange={(e) => setLoginInput(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={onLogin}>Login</button>
        </form>
        <p>
          No account yet? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
