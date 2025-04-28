"use client"

import { auth } from "../data/firebase"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth"
import "./LoginForm.css"
import { useState, useEffect } from "react"

const LoginForm = ({ onClose }) => {
  const validDomains = ["ucsd.edu", "health.ucsd.edu", "sdsc.edu", "scripps.edu", "eng.ucsd.edu"]
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [detailedError, setDetailedError] = useState(null)

  // Check for redirect result on component mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          const userEmail = result.user.email
          if (!isValidUCSDEmail(userEmail)) {
            await auth.signOut()
            setError("Please use your UCSD email address to sign in.")
            return
          }
          onClose()
        }
      } catch (error) {
        console.error("Redirect sign-in error:", error)
        handleAuthError(error)
      }
    }

    checkRedirectResult()
  }, [])

  const isValidUCSDEmail = (email) => {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    const domain = email.split("@")[1]
    return validDomains.includes(domain)
  }

  const handleAuthError = (error) => {
    console.error("Full auth error:", error)

    // Set detailed error for debugging
    setDetailedError(
      `Error code: ${error.code || "unknown"}, Message: ${error.message || "No message"}, Name: ${error.name || "No name"}`,
    )

    // Handle specific error cases
    if (error.code === "auth/popup-closed-by-user") {
      setError("Sign-in was cancelled. Please try again.")
    } else if (error.code === "auth/popup-blocked") {
      setError(
        "Sign-in popup was blocked by your browser. Please allow popups for this site or try the redirect method.",
      )
    } else if (error.code === "auth/cancelled-popup-request") {
      // This is a normal case when user clicks multiple times, no need to show error
      setError(null)
    } else if (error.code === "auth/network-request-failed") {
      setError("Network error. Please check your internet connection and try again.")
    } else if (error.code === "auth/unauthorized-domain") {
      setError("This domain is not authorized for authentication. Please contact the administrator.")
    } else if (error.code === "auth/internal-error") {
      setError("An internal authentication error occurred. Please try again or use the redirect method.")
    } else {
      setError(
        `Authentication error: ${error.message || "Unknown error"}. Please try again or use the redirect method.`,
      )
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: "select_account",
    })

    try {
      setError(null)
      setDetailedError(null)
      setIsLoading(true)

      // Try popup sign-in
      const result = await signInWithPopup(auth, provider)
      const userEmail = result.user.email

      if (!isValidUCSDEmail(userEmail)) {
        await auth.signOut()
        setError("Please use your UCSD email address to sign in.")
        return
      }

      onClose()
    } catch (error) {
      handleAuthError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignInRedirect = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: "select_account",
    })

    try {
      setError(null)
      setDetailedError(null)
      setIsLoading(true)

      // Use redirect method instead of popup
      await signInWithRedirect(auth, provider)
      // The result will be handled in the useEffect
    } catch (error) {
      handleAuthError(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form-container">
      <h2 className="login-title">{"Log In"}</h2>

      {error && <div className="error-message">{error}</div>}
      {detailedError && <div className="detailed-error">{detailedError}</div>}

      <button type="button" onClick={handleGoogleSignIn} className="google-sign-in-button" disabled={isLoading}>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in with Popup</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleGoogleSignInRedirect}
        className="google-sign-in-button redirect"
        disabled={isLoading}
      >
        <span>Sign in with Redirect</span>
      </button>

      <div className="troubleshooting-tips">
        <h3>Troubleshooting Tips:</h3>
        <ul>
          <li>Make sure popups are allowed in your browser</li>
          <li>Try using the redirect method if popup doesn't work</li>
          <li>Use a UCSD email address (@ucsd.edu)</li>
          <li>Try a different browser if issues persist</li>
        </ul>
      </div>
    </div>
  )
}

export default LoginForm
