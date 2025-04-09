"use client"

import { useState, useRef, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import { Document, Page, pdfjs } from "react-pdf"
import { Loader2 } from "lucide-react"

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const FundraisingGuide = () => {
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pdfPages, setPdfPages] = useState([])
  const bookRef = useRef(null)
  const pdfUrl = "/fundraising-guide.pdf" // Update this with your actual PDF path

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)

    // Create an array of page numbers
    const pages = Array.from(new Array(numPages), (_, index) => index + 1)
    setPdfPages(pages)
  }

  // Handle window resize to adjust the book size
  useEffect(() => {
    const handleResize = () => {
      if (bookRef.current) {
        bookRef.current.updateSize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fundraising-guide-container">
      <header className="fundraising-header">
        <h1>Fundraising Guide</h1>
      </header>

      <div className="pdf-viewer-container">
        {loading ? (
          <div className="loading-container">
            <Loader2 className="animate-spin" size={48} />
            <p>Loading PDF...</p>
          </div>
        ) : (
          <HTMLFlipBook
            width={550}
            height={733}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            showCover={true}
            ref={bookRef}
            className="pdf-flipbook"
          >
            {pdfPages.map((pageNumber) => (
              <div key={pageNumber} className="pdf-page">
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} width={550} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </div>
    </div>
  )
}

export default FundraisingGuide
