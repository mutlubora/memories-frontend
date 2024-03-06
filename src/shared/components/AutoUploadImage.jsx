import React from "react";
import "./AutoUploadImage.css";
export default function AutoUploadImage({ image, uploading }) {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={image}
        className="img-thumbnail"
        style={{ width: 250, height: 250 }}
      />
      <div
        className="overlay"
        style={{ width: 250, height: 250, opacity: uploading ? 1 : 0 }}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
