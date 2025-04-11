"use client"

import { useState } from "react"
import { Loader2, FileWarning, Download } from "lucide-react"

const SimplePdfObject = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleLoad = () => {
    console.log("PDF object loaded")
    setLoading(false)
  }

  const handleError = () => {
    console.error("PDF object failed to load")
    setError("Failed to load PDF")
    setLoading(false)
  }

  const handleDownload = async () => {
    try {
      setDownloadStarted(true)

      // Create a temporary link and trigger download
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = pdfUrl.split("/").pop() || "fundraising-guide.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success message
      setTimeout(() => {
        alert("Download initiated. If the file doesn't download automatically, please check your browser settings.")
      }, 1000)
    } catch (err) {
      console.error("Download error:", err)
      alert(`Failed to download the PDF: ${err.message}. Please try again later.`)
    } finally {
      setDownloadStarted(false)
    }
  }

  return (
    <div className="simple-pdf-object">
      {loading && (
        <div className="pdf-loading-overlay">
          <Loader2 className="animate-spin" size={48} />
          <p>Loading PDF...</p>
        </div>
      )}

      {error ? (
        <div className="pdf-error-container">
          <FileWarning size={48} />
          <p>{error}</p>
          <button onClick={handleDownload} className="download-button" disabled={downloadStarted}>
            {downloadStarted ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} />
                Download PDF
              </>
            )}
          </button>
          <p className="direct-link-note">
            You can also{" "}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              open the PDF in a new tab
            </a>
          </p>
        </div>
      ) : (
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
          onLoad={handleLoad}
          onError={handleError}
          className="pdf-object"
        >
          <p>
            Your browser doesn't support embedded PDFs.
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Click here to download the PDF
            </a>
            .
          </p>
        </object>
      )}
    </div>
  )
}

export default SimplePdfObject
