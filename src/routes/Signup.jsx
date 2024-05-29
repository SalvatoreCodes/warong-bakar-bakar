import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../firebase/firebase";
import { ref, set } from "firebase/database";

import ErrorPopup from "../components/ErrorPopup";
import Back from "../components/Back";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await set(ref(database, `users/${user.uid}`), {
        displayName: name,
        email: user.email,
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const closeErrorPopup = () => {
    setError("");
  };

  return (
    <div className="signup--container">
      <Link to="/">
        <Back />
      </Link>

      <div className="signup">
        <h1>Create Account</h1>
        <form noValidate onSubmit={onSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button type="submit">Sign up</button>
        </form>
        {error && <ErrorPopup error={error} onClose={closeErrorPopup} />}
        <p>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
