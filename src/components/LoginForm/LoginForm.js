import React, { useState } from "react";
import { login } from "../../utilities/users-services";

export default function LoginForm({ user, setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const userToLogin = await login(credentials)
      setUser(userToLogin)
    } catch {
        setError('Error Logging In')
    }
  }

  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="error-message">{error}</p>
    </div>
  );
}
