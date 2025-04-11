"use client"

import { useState, useEffect } from "react"
import { Loader2, FileWarning, Download, ExternalLink } from "lucide-react"

const EmergencyPdfViewer = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadStarted, setDownloadStarted] = useState(false)

  // Force a cache-busting parameter on the URL
  const cacheBustedUrl = `${pdfUrl}${pdfUrl.includes("?") ? "&" : "?"}cache=${Date.now()}`

  // Set a timeout to hide the loading indicator after 5 seconds regardless
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    try {
      setDownloadStarted(true)

      // Open the PDF in a new tab for download
      window.open(pdfUrl, "_blank")

      setTimeout(() => {
        setDownloadStarted(false)
      }, 2000)
    } catch (err) {
      console.error("Download error:", err)
      setError(`Failed to download: ${err.message}`)
      setDownloadStarted(false)
    }
  }

  return (
    <div className="emergency-pdf-viewer">
      {loading && (
        <div className="pdf-loading-overlay">
          <Loader2 className="animate-spin" size={48} />
          <p>Loading PDF...</p>
        </div>
      )}

      <div className="emergency-viewer-container">
        <div className="emergency-viewer-frame">
          <iframe
            src={cacheBustedUrl}
            className="emergency-iframe"
            title="PDF Viewer"
            onLoad={() => setLoading(false)}
            onError={() => {
              setError("Failed to load PDF in iframe")
              setLoading(false)
            }}
          />
        </div>

        <div className="emergency-controls">
          <p className="emergency-note">If the PDF doesn't load properly above, you can:</p>

          <div className="emergency-buttons">
            <button onClick={handleDownload} className="emergency-button" disabled={downloadStarted}>
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

            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="emergency-button secondary">
              <ExternalLink size={16} />
              Open in New Tab
            </a>
          </div>

          {error && (
            <div className="emergency-error">
              <FileWarning size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmergencyPdfViewer
