import { useState, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

export default function PDFViewer({ url, onFinishRead }) {
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [hasFinished, setHasFinished] = useState(false);

  // Store stable onFinishRead
  const onFinishReadRef = useRef(onFinishRead);
  useEffect(() => {
    onFinishReadRef.current = onFinishRead;
  }, [onFinishRead]);

  // Stabilize the URL so <Document file={{ url }} /> doesn't reload
  const stableFile = useMemo(() => ({ url }), [url]);

  // ResizeObserver to track container width
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Scroll detection
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || hasFinished) return;

    const scrollPosition = el.scrollTop + el.clientHeight;
    const scrollHeight = el.scrollHeight;
    const scrollPercent = (scrollPosition / scrollHeight) * 100;

    if (scrollPercent >= 90) {
      setHasFinished(true);
      if (typeof onFinishReadRef.current === "function") {
        // Call without triggering parent state affecting this component
        setTimeout(() => onFinishReadRef.current(), 0);
      }
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="max-h-[400px] overflow-y-auto"
        onScroll={handleScroll}
      >
        <Document
          file={stableFile}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p>Loading PDF…</p>}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
