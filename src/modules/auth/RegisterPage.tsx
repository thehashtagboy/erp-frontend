import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../app/apiClient";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await apiClient.post("/api/auth/register", { username, password, email });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-white py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-2">Register</h2>
        <p className="text-sm text-gray-500 mb-6">Create a new account</p>
        
        {error && <div className="alert alert-error mb-4">{error}</div>}
        {success && <div className="alert alert-success mb-4">Registration successful! Redirecting to login...</div>}
        
        <form onSubmit={handleRegister}>
          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="input input-bordered w-full" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          
          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input 
              type="text" 
              placeholder="Username" 
              className="input input-bordered w-full" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          
          <label className="form-control w-full mb-6">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              className="input input-bordered w-full" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          
          <button type="submit" className="btn btn-primary w-full text-white">Register</button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          Already have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}