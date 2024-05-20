import React, { useState, useEffect } from 'react';

const PdfComp = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to load PDF');
        }
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setLoading(false);
        setError(null);
        setPdfUrl(objectUrl);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();

    return () => {
      // Clean up object URL when component unmounts
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [url]);

  const [pdfUrl, setPdfUrl] = useState(null);

  if (loading) {
    return <p>Loading PDF...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="pdf-container">
      <object data={pdfUrl} type="application/pdf" width="100%" height="500px">
        <p>PDF viewer not available. Please download the PDF to view it.</p>
      </object>
    </div>
  );
};

export default PdfComp;
