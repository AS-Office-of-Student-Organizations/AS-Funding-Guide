"use client"

import { useState } from "react"
import { Loader2, FileWarning, Download, ExternalLink } from "lucide-react"

const FallbackPdfViewer = ({ pdfUrl, error }) => {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setDownloading(true)

      // Use more specific fetch options to ensure proper handling of the PDF
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
        cache: "no-store", // Avoid caching issues
      })

      // Log response details for debugging
      console.log("PDF download response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
      })

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`)
      }

      // Check content type to ensure it's a PDF
      const contentType = response.headers.get("content-type")
      if (contentType && !contentType.includes("application/pdf") && !contentType.includes("octet-stream")) {
        console.warn(`Warning: Expected PDF content type but got ${contentType}`)
      }

      // Get the blob and create a download link
      const blob = await response.blob()

      // Create a new blob with explicit PDF type to ensure proper handling
      const pdfBlob = new Blob([blob], { type: "application/pdf" })

      // Create object URL from the blob
      const url = window.URL.createObjectURL(pdfBlob)

      // Create and trigger download link
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = pdfUrl.split("/").pop() || "fundraising-guide.pdf"
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      // Show success message
      alert("PDF downloaded successfully. If the file appears corrupted, please contact support.")
    } catch (err) {
      console.error("Download error:", err)
      alert(`Failed to download the PDF: ${err.message}. Please try again later or contact support.`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="fallback-pdf-container">
      <div className="fallback-pdf-content">
        <FileWarning size={64} className="fallback-icon" />
        <h2>Unable to display PDF</h2>
        <p className="fallback-error">{error || "There was an error loading the PDF viewer."}</p>

        <div className="troubleshooting-section">
          <h3>Possible Solutions:</h3>
          <ul className="troubleshooting-list">
            <li>The PDF might be too large or complex for the viewer</li>
            <li>Your browser might have compatibility issues with the PDF viewer</li>
            <li>The PDF might contain features not supported by the viewer</li>
            <li>Try using a different browser</li>
          </ul>
        </div>

        <p>You can try downloading the PDF instead:</p>
        <button onClick={handleDownload} className="download-button" disabled={downloading}>
          {downloading ? (
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

        {/* Add direct link option */}
        <p className="fallback-alternative">
          Or try opening the PDF directly in your browser:
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="direct-link">
            <ExternalLink size={14} />
            Open PDF directly
          </a>
        </p>
      </div>
    </div>
  )
}

export default FallbackPdfViewer
