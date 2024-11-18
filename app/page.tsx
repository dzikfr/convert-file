'use client';

import React, { useState } from 'react';
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

const HomePage = () => {
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

          if (typeof imageSrc === 'string') {
            const resultBlob = await imglyRemoveBackground(imageSrc);
            const url = URL.createObjectURL(resultBlob);
            setRemovedBgImage(url);
          } else {
            console.error('Gambar tidak dalam format yang valid');
          }
        };

        reader.readAsDataURL(image);
      } catch (error) {
        console.error('Error removing background:', error);
      }
    }
  };

  const downloadImage = () => {
    if (removedBgImage) {
      const link = document.createElement('a');
      link.href = removedBgImage;
      link.download = 'result.png'; // Nama file yang akan diunduh
      link.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-blue-600">Remove Background</h1>

        {/* Input file */}
        <div className="flex justify-center">
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
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
            <h3 className="text-xl font-semibold text-green-500">Result</h3>
            <img
              src={removedBgImage}
              alt="Removed Background"
              className="mt-4 rounded-lg shadow-md max-w-full h-auto"
            />
            {/* Download button */}
            <div className="mt-4">
              <button
                onClick={downloadImage}
                className="btn btn-secondary w-full mt-2"
              >
                Download Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
