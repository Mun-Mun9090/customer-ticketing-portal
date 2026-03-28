import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!usernameRegex.test(username)) {
    alert(
      "Invalid Username.\nMinimum 4 characters.\nOnly letters and numbers allowed.\nNo spaces."
    );
    return;
  }

  if (!passwordRegex.test(password)) {  
    alert(
      "Invalid Password.\nMinimum 6 characters.\nMust include uppercase, lowercase and number."
    );
    return;
  }

  // If both validations pass
  setIsAuthenticated(true);
  navigate("/");
};

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}