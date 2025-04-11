"use client"

/**
 * Utility functions for PDF handling in React components
 */

import { useEffect, useState } from "react"

/**
 * Checks if a file exists at the given URL
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} - Promise that resolves to true if file exists, false otherwise
 */
export const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error("Error checking file existence:", error)
    return false
  }
}

/**
 * Gets file information for a given URL
 * @param {string} url - The URL to check
 * @returns {Promise<Object|null>} - Promise that resolves to file info object or null
 */
export const getFileInfo = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" })
    if (!response.ok) return null

    return {
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      lastModified: response.headers.get("last-modified"),
    }
  } catch (error) {
    console.error("Error getting file info:", error)
    return null
  }
}

/**
 * Validates if a file is a valid PDF - with more lenient checking
 * @param {string} url - The URL of the PDF file
 * @returns {Promise<{isValid: boolean, reason: string|null}>} - Promise with validation result
 */
export const validatePdf = async (url) => {
  try {
    // First check if the file exists and can be accessed
    const exists = await checkFileExists(url)
    if (!exists) {
      return { isValid: false, reason: "File does not exist or cannot be accessed" }
    }

    // Check content type from headers
    const info = await getFileInfo(url)
    const contentType = info?.contentType || ""

    // If content type is explicitly PDF, consider it valid
    if (contentType.includes("application/pdf")) {
      return { isValid: true, reason: null }
    }

    // If content type is octet-stream or empty, we'll check the content
    if (contentType === "" || contentType.includes("octet-stream")) {
      try {
        // Try to fetch the first few bytes to check for PDF signature
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Range: "bytes=0-10", // Get a bit more data for better validation
          },
        })

        if (!response.ok) {
          return {
            isValid: false,
            reason: `Failed to fetch file content: ${response.status} ${response.statusText}`,
          }
        }

        const buffer = await response.arrayBuffer()
        const bytes = new Uint8Array(buffer)

        // Convert bytes to string for inspection
        let signature = ""
        for (let i = 0; i < Math.min(bytes.length, 10); i++) {
          signature += String.fromCharCode(bytes[i])
        }

        console.log("File signature:", signature, "Bytes:", Array.from(bytes.slice(0, 10)))

        // Check for PDF signature: %PDF-
        // Being more lenient - just check for %PDF anywhere in the first few bytes
        if (signature.includes("%PDF")) {
          return { isValid: true, reason: null }
        }

        return {
          isValid: false,
          reason: `Invalid PDF signature: "${signature}" (expected to contain "%PDF")`,
        }
      } catch (error) {
        return {
          isValid: false,
          reason: `Error reading file content: ${error.message}`,
        }
      }
    }

    // If content type is something else entirely, it's probably not a PDF
    return {
      isValid: false,
      reason: `Unexpected content type: ${contentType}`,
    }
  } catch (error) {
    console.error("Error validating PDF:", error)
    return {
      isValid: false,
      reason: `Validation error: ${error.message}`,
    }
  }
}

/**
 * React hook to check if a file exists and get its info
 * @param {string} url - The URL to check
 * @returns {Object} - Object containing fileExists, fileInfo, and error states
 */
export const usePdfFileCheck = (url) => {
  const [fileExists, setFileExists] = useState(null)
  const [fileInfo, setFileInfo] = useState(null)
  const [isValidPdf, setIsValidPdf] = useState(null)
  const [validationDetails, setValidationDetails] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkFile = async () => {
      try {
        setLoading(true)

        // Check if file exists
        const exists = await checkFileExists(url)
        setFileExists(exists)

        if (exists) {
          // Get file info
          const info = await getFileInfo(url)
          setFileInfo(info)

          // Validate PDF with more detailed response
          const validation = await validatePdf(url)
          setIsValidPdf(validation.isValid)
          setValidationDetails(validation.reason)

          if (!validation.isValid) {
            setError(`File at ${url} is not a valid PDF: ${validation.reason}`)
          }
        } else {
          setError(`File not found at ${url}`)
        }
      } catch (err) {
        setError(`Error checking file: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    checkFile()
  }, [url])

  return {
    fileExists,
    fileInfo,
    isValidPdf,
    validationDetails,
    error,
    loading,
  }
}

export default {
  checkFileExists,
  getFileInfo,
  usePdfFileCheck,
  validatePdf,
}
