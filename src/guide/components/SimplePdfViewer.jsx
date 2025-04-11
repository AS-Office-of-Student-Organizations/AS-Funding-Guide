"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const SimplePdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error)
    setError(`Error loading PDF: ${error.message}`)
    setLoading(false)
  }

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

  return (
    <div className="simple-pdf-viewer">
      {error ? (
        <div className="pdf-error">
          <p>{error}</p>
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
                  <p>Loading PDF...</p>
                </div>
              }
              options={{
                cMapUrl: "https://unpkg.com/pdfjs-dist@3.4.120/cmaps/",
                cMapPacked: true,
                standardFontDataUrl: "https://unpkg.com/pdfjs-dist@3.4.120/standard_fonts/",
              }}
            >
              {loading ? null : <Page pageNumber={pageNumber} width={600} />}
            </Document>
          </div>

          {!loading && !error && (
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
          )}
        </>
      )}
    </div>
  )
}

export default SimplePdfViewer
