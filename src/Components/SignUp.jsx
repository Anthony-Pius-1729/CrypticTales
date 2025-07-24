// components/Signup.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust path as needed

const Signup = ({ AUTH_STATE }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    AUTH_STATE({ login: false, signup: true });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Sign up error:", error.message);
    } else {
      setMessage(
        "Sign up successful! Please check your email for a confirmation link."
      );
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <span
          className="text-blue-400 cursor-pointer"
          onClick={() => AUTH_STATE({ login: true, signup: false })}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
