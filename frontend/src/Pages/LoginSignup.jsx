import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // Login or Sign Up
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (state === "Sign Up" && !formData.username.trim()) {
      return alert("Please enter your name");
    }
    if (!formData.email.trim() || !formData.password.trim()) {
      return alert("Email and password are required");
    }

    setLoading(true);

    try {
      const url =
        state === "Login"
          ? "https://e-commerce-vfne.onrender.com/login"
          : "https://e-commerce-vfne.onrender.com/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Continue"}
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>
            By continuing, I agree to the <b>Terms of Use</b> &{" "}
            <b>Privacy Policy</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
