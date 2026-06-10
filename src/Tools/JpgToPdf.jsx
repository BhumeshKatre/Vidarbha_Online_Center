import React, { useState } from "react";

function JpgToPdf() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#0B4AA2] mb-4">
          JPG to PDF Converter
        </h1>

        <p className="text-gray-600 mb-6">
          Upload JPG or PNG images and convert them into a PDF file.
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-3 rounded-lg"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">
              Selected Files ({files.length})
            </h3>

            {files.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 mb-2"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}

        <button
          className="mt-6 bg-[#0B4AA2] text-white px-6 py-3 rounded-lg"
        >
          Convert to PDF
        </button>

      </div>
    </div>
  );
}

export default JpgToPdf;