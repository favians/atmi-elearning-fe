import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ url, onFinishRead }) {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [hasFinished, setHasFinished] = useState(false);
  const containerRef = useRef(null);

  // 🔥 Stabilkan file reference (WAJIB)
  const file = useMemo(() => ({ url }), [url]);

  // 🔥 Stabilkan callback
  const handleLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  // 🔥 Resize observer (tidak bikin re-render loop)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      setContainerWidth((prev) => (prev !== newWidth ? newWidth : prev));
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔥 Scroll detection optimized
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || hasFinished) return;

    const scrollPosition = el.scrollTop + el.clientHeight;
    const scrollHeight = el.scrollHeight;

    if (scrollPosition / scrollHeight >= 0.9) {
      setHasFinished(true);
      onFinishRead?.();
    }
  }, [hasFinished, onFinishRead]);

  return (
    <div
      ref={containerRef}
      className="max-h-[500px] overflow-y-auto"
      onScroll={handleScroll}
    >
      <Document
        file={file}
        onLoadSuccess={handleLoadSuccess}
        loading={<p>Loading PDF…</p>}
        options={{
          cMapUrl: "https://unpkg.com/pdfjs-dist@3.11.174/cmaps/",
          cMapPacked: true,
        }}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={containerWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false} // 🔥 ini bikin jauh lebih smooth
            />
          ))}
      </Document>
    </div>
  );
}
