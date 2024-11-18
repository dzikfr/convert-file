"use client";

import React, { useState } from "react";
import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

const RemoveBgPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  const removeBackground = async () => {
    if (image) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageSrc = reader.result;

          if (typeof imageSrc === "string") {
            const resultBlob = await imglyRemoveBackground(imageSrc);
            const url = URL.createObjectURL(resultBlob);
            setRemovedBgImage(url);
          } else {
            console.error("Gambar tidak dalam format yang valid");
          }
        };

        reader.readAsDataURL(image);
      } catch (error) {
        console.error("Error removing background:", error);
      }
    }
  };

  const downloadImage = () => {
    if (removedBgImage) {
      const link = document.createElement("a");
      link.href = removedBgImage;
      link.download = "removedbg.png";
      link.click();
    }
  };

  const clearImage = () => {
    setImage(null);
    setRemovedBgImage(null);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Remove Background</h1>

      {/* Input file */}
      <div className="flex justify-center">
        <input
          type="file"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      {/* Button to generate */}
      <div className="flex justify-center">
        <button
          onClick={removeBackground}
          className="btn btn-primary w-full mt-4"
        >
          Generate
        </button>
      </div>

      {/* Display result */}
      {removedBgImage && (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Result</h3>
          <img
            src={removedBgImage}
            alt="Removed Background"
            className="mt-4 rounded-lg shadow-md max-w-full h-auto"
          />
          {/* Download button */}
          <div className="mt-4">
            <button
              onClick={downloadImage}
              className="btn btn-success w-full mt-2"
            >
              Download Image
            </button>
          </div>

          {/* Clear button */}
          <div className="mt-4">
            <button onClick={clearImage} className="btn btn-error w-full mt-2">
              Clear Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBgPage;
