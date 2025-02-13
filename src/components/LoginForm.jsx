"use client"

import { useState } from "react"
import { auth } from "./firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email.endsWith("@ucsd.edu")) {
      setError("Please use a valid UCSD email address.")
      return
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onClose() // Close the modal after successful login/signup
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0d2a58]">{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-left">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.name@ucsd.edu"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-left">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#0d2a58] text-white rounded-md hover:bg-[#164bb4] transition-colors"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
        <p className="text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-[#164bb4] hover:underline">
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  )
}

export default LoginForm

