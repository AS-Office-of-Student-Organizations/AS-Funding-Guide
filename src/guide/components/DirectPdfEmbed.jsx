"use client"

import { useState, useEffect } from "react"
import { Loader2, FileWarning, Download } from "lucide-react"

const DirectPdfEmbed = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadStarted, setDownloadStarted] = useState(false)

  // Add a cache-busting parameter to the URL
  const cacheBustedUrl = `${pdfUrl}${pdfUrl.includes("?") ? "&" : "?"}cache=${Date.now()}`

  const handleIframeLoad = () => {
    console.log("DirectPdfEmbed: iframe loaded")
    setLoading(false)
  }

  const handleIframeError = (e) => {
    console.error("DirectPdfEmbed: iframe error", e)
    setError("Failed to load PDF in iframe")
    setLoading(false)
  }

  // Fallback timeout - if iframe doesn't load within 10 seconds, show download option
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("DirectPdfEmbed: iframe load timeout")
        setError("PDF viewer is taking too long to load. Please try downloading the file instead.")
      }
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [loading])

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
    <div className="direct-pdf-embed">
      {loading && (
        <div className="pdf-loading-overlay">
          <Loader2 className="animate-spin" size={48} />
          <p>Loading PDF directly...</p>
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
        <iframe
          src={cacheBustedUrl}
          width="100%"
          height="100%"
          title="PDF Viewer"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className="pdf-iframe"
        />
      )}
    </div>
  )
}

export default DirectPdfEmbed
