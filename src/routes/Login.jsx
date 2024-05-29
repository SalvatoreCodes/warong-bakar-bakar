import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import ErrorPopup from "../components/ErrorPopup";
import Back from "../components/Back";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeErrorPopup = () => {
    setError("");
  };

  return (
    <div className="login--container">
      <Back />
      <div className="login">
        <h1>Welcome Back!</h1>
        <form noValidate onSubmit={onLogin}>
          <input
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <ErrorPopup error={error} onClose={closeErrorPopup} />}
        <p>
          No account yet? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
