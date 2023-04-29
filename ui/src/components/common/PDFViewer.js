import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "./PDFViewer.css";

function PDFViewer({ book_pdf_url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <>
      <nav className="centered">
        <button onClick={goToPrevPage} className="previous round">
          &#8249;
        </button>
        <button className="next round" onClick={goToNextPage}>
          &#8250;
        </button>
        <p className="centered">
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <Document
        file={{
          url: book_pdf_url,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </>
  );
}

export default PDFViewer;
