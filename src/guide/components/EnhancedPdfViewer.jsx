"use client"

import { useState, useEffect, useRef } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

// Configure PDF.js with all necessary options
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const EnhancedPdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scale, setScale] = useState(1.0)
  const [rotation, setRotation] = useState(0)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(600)

  // Adjust container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth - 40 // Subtract padding
        setContainerWidth(Math.min(newWidth, 800)) // Cap at 800px
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Function to handle document load success
  function onDocumentLoadSuccess(pdf) {
    console.log("PDF loaded successfully with", pdf.numPages, "pages")
    setNumPages(pdf.numPages)
    setLoading(false)
    setPdfDocument(pdf)
    setError(null)
  }

  // Function to handle document load error with retry logic
  function onDocumentLoadError(err) {
    console.error("Error loading PDF:", err)

    // If we haven't tried too many times, retry loading
    if (loadAttempts < 3) {
      console.log(`Retrying PDF load, attempt ${loadAttempts + 1}`)
      setLoadAttempts((prev) => prev + 1)
      // Force a reload with a slight delay
      setTimeout(() => {
        setLoading(true)
        // Add a cache-busting parameter to the URL
        const cacheBuster = `?cache=${Date.now()}`
        const urlWithCache = pdfUrl.includes("?") ? `${pdfUrl}&cache=${Date.now()}` : `${pdfUrl}${cacheBuster}`

        // We'll trigger a re-render by updating the component state
        setError(`Retrying... (Attempt ${loadAttempts + 1})`)
      }, 1500)
    } else {
      setError(`Error loading PDF: ${err.message}. Please try downloading the file instead.`)
      setLoading(false)
    }
  }

  // Navigation functions
  function changePage(offset) {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset
      return newPage >= 1 && newPage <= numPages ? newPage : prevPageNumber
    })
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  // Zoom functions
  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
  }

  // Rotation function
  function rotate() {
    setRotation((prevRotation) => (prevRotation + 90) % 360)
  }

  return (
    <div className="enhanced-pdf-viewer" ref={containerRef}>
      {error ? (
        <div className="pdf-error">
          <p>{error}</p>
          {loadAttempts < 3 && (
            <div className="retry-loading">
              <Loader2 className="animate-spin" size={24} />
              <p>Attempting to reload PDF...</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="pdf-document-container">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="pdf-loading">
                  <Loader2 className="animate-spin" size={48} />
                  <p>Loading PDF... {loadAttempts > 0 ? `(Attempt ${loadAttempts + 1})` : ""}</p>
                </div>
              }
              options={{
                cMapUrl: "https://unpkg.com/pdfjs-dist@3.4.120/cmaps/",
                cMapPacked: true,
                standardFontDataUrl: "https://unpkg.com/pdfjs-dist@3.4.120/standard_fonts/",
                disableStream: false,
                disableAutoFetch: false,
                isEvalSupported: true,
                useSystemFonts: true,
                enableXfa: true,
                useWorkerFetch: true,
              }}
            >
              {loading ? null : (
                <Page
                  key={`page_${pageNumber}_scale_${scale}_rotation_${rotation}`}
                  pageNumber={pageNumber}
                  width={containerWidth * scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  scale={scale}
                  rotate={rotation}
                  loading={
                    <div className="page-loading">
                      <Loader2 className="animate-spin" size={24} />
                    </div>
                  }
                  error={<div className="page-error">Failed to load page {pageNumber}</div>}
                  onRenderSuccess={() => console.log(`Page ${pageNumber} rendered successfully`)}
                  onRenderError={(err) => console.error(`Error rendering page ${pageNumber}:`, err)}
                />
              )}
            </Document>
          </div>

          {!loading && !error && (
            <>
              <div className="pdf-controls">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className="control-button"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <p className="pdf-pagination">
                  Page {pageNumber} of {numPages}
                </p>

                <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                  className="control-button"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="pdf-tools">
                <button type="button" onClick={zoomIn} className="tool-button" aria-label="Zoom in">
                  <ZoomIn size={16} />
                </button>
                <button type="button" onClick={zoomOut} className="tool-button" aria-label="Zoom out">
                  <ZoomOut size={16} />
                </button>
                <button type="button" onClick={rotate} className="tool-button" aria-label="Rotate page">
                  <RotateCw size={16} />
                </button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default EnhancedPdfViewer
