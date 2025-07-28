import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// 🧠 Setup manual worker (harus ada di public/pdfjs)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

export default function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Document
      file={{ url }}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      <Page pageNumber={pageNumber} />
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </Document>
  );
}
