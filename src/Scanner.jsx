import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

function Scanner() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset for re-upload
      fileInputRef.current.click();
    }
  };

  const runOcr = (file) => {
    setLoading(true);
    setOcrText("");
    Tesseract.recognize(file, "eng", { logger: () => {} })
      .then(({ data: { text } }) => {
        setOcrText(text);
      })
      .finally(() => setLoading(false));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      runOcr(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      runOcr(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      {imageUrl ? (
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: 16,
            overflow: "hidden",
            margin: "32px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9f9f9",
          }}
        >
          <img
            src={imageUrl}
            alt="Feltöltött kép"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          style={{
            width: 300,
            height: 300,
            border: "2px dashed #aaa",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#f9f9f9",
            margin: "32px auto",
            fontSize: "1.2rem",
            color: "#555",
            textAlign: "center",
            position: "relative",
          }}
          onClick={handleBoxClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          Tölts fel képet
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      )}
      <div
        style={{
          width: 300,
          minHeight: 100,
          border: "1px solid #ddd",
          borderRadius: 12,
          background: "#fff",
          margin: "0 auto 32px auto",
          padding: 16,
          fontSize: "1rem",
          color: "#222",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          whiteSpace: "pre-wrap",
        }}
      >
        {loading
          ? "Szöveg felismerése folyamatban..."
          : ocrText || "A felismert szöveg itt fog megjelenni."}
      </div>
    </div>
  );
}

export default Scanner;
