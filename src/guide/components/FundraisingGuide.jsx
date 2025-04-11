"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
import { usePdfFileCheck } from "./pdfUtils.jsx"
import FallbackPdfViewer from "./FallbackPdfViewer"
import EmergencyPdfViewer from "./EmergencyPdfViewer"

const FundraisingGuide = () => {
  const [loading, setLoading] = useState(true)
  const [pdfError, setPdfError] = useState(null)
  const [viewerFailed, setViewerFailed] = useState(false)

  // Try different paths for the PDF file
  const [pdfPath, setPdfPath] = useState("/fundraising-guide.pdf")
  const alternativePaths = [
    "/fundraising-guide.pdf",
    "/public/fundraising-guide.pdf",
    "/assets/fundraising-guide.pdf",
    "/documents/fundraising-guide.pdf",
    "/files/fundraising-guide.pdf",
    "/guide/fundraising-guide.pdf",
  ]

  // Use the custom hook for file checking with improved validation
  const {
    fileExists,
    fileInfo,
    isValidPdf,
    validationDetails,
    error: fileError,
    loading: fileLoading,
  } = usePdfFileCheck(pdfPath)

  // Set a short timeout to hide the loading indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // If we're still checking if the file exists, show loading
  if (fileLoading) {
    return (
      <div className="fundraising-guide-container">
        <header className="fundraising-header">
          <h1>Fundraising Guide</h1>
        </header>
        <div className="pdf-viewer-container">
          <div className="loading-container">
            <Loader2 className="animate-spin" size={48} />
            <p>Checking PDF file...</p>
          </div>
        </div>
      </div>
    )
  }

  // If the file doesn't exist or is not a valid PDF, show error with troubleshooting info
  if (fileExists === false || (isValidPdf === false && validationDetails?.includes("text/html"))) {
    return (
      <div className="fundraising-guide-container">
        <header className="fundraising-header">
          <h1>Fundraising Guide</h1>
        </header>
        <div className="pdf-viewer-container">
          <div className="error-container">
            <AlertTriangle size={48} className="mb-4" />
            <p className="error-message">HTML Content Detected Instead of PDF</p>
            <p>
              The server is returning HTML content instead of a PDF file at: <code>{pdfPath}</code>
            </p>
            <div className="troubleshooting-tips">
              <h3>How to Fix This:</h3>
              <ol className="text-left">
                <li>
                  <strong>Upload the PDF file:</strong> Make sure you've uploaded the PDF file to your server.
                </li>
                <li>
                  <strong>Check the location:</strong> The PDF should be in the <code>public</code> folder at the root
                  of your project.
                </li>
                <li>
                  <strong>Try a different path:</strong> If you've placed the PDF in a different folder, try one of
                  these paths:
                  <ul className="path-list">
                    {alternativePaths.map((path, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setPdfPath(path)}
                          className={`path-button ${path === pdfPath ? "active" : ""}`}
                        >
                          {path}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Upload the PDF manually:</strong> If you're using a hosting service, try uploading the PDF
                  through their file manager.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If the PDF viewer failed, show the fallback
  if (viewerFailed) {
    return (
      <div className="fundraising-guide-container">
        <header className="fundraising-header">
          <h1>Fundraising Guide</h1>
        </header>
        <div className="pdf-viewer-container">
          <FallbackPdfViewer pdfUrl={pdfPath} error={pdfError || fileError} />
        </div>
      </div>
    )
  }

  return (
    <div className="fundraising-guide-container">
      <header className="fundraising-header">
        <h1>Fundraising Guide</h1>
      </header>

      <div className="pdf-viewer-container">
        {loading ? (
          <div className="loading-container">
            <Loader2 className="animate-spin" size={48} />
            <p>Loading PDF viewer...</p>
          </div>
        ) : (
          <EmergencyPdfViewer pdfUrl={pdfPath} />
        )}
      </div>

      <div className="debug-info">
        <h3>PDF Debugging Information</h3>
        <p>
          <strong>Current PDF Path:</strong> {pdfPath}
        </p>
        <p>
          <strong>File exists:</strong> {fileExists !== null ? String(fileExists) : "Checking..."}
        </p>
        <p>
          <strong>Valid PDF:</strong> {isValidPdf !== null ? String(isValidPdf) : "Checking..."}
        </p>
        {validationDetails && (
          <p>
            <strong>Validation details:</strong> {validationDetails}
          </p>
        )}
        {fileInfo && (
          <>
            <p>
              <strong>Content Type:</strong> {fileInfo.contentType || "Not specified"}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {fileInfo.contentLength ? `${Math.round(fileInfo.contentLength / 1024)} KB` : "Unknown"}
            </p>
            <p>
              <strong>Last Modified:</strong> {fileInfo.lastModified || "Unknown"}
            </p>
          </>
        )}
        {pdfError && (
          <p>
            <strong>Error:</strong> {pdfError}
          </p>
        )}
        {fileError && (
          <p>
            <strong>File Error:</strong> {fileError}
          </p>
        )}
      </div>
    </div>
  )
}

export default FundraisingGuide
