import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function ImageGallery() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://simple-mern-image-gallery.onrender.com/api/images");
      const { data } = await response.json();
      setImageList(data);
    } catch {
      toast.error("Internal Server Error, Please try again");
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const formData = new FormData();
    
    Array.from(files).forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(
        "https://simple-mern-image-gallery.onrender.com/api/images/upload-images",
        {
          method: "POST",
          body: formData,
        }
      );
      const { message } = await response.json();
      toast.success(message);
      fetchImages();
    } catch {
      toast.error("Error while uploading images");
    } finally {
      setLoading(false);
    }
  };

  const toggleFullscreen = (imageURL) => {
    setFullscreenImage(fullscreenImage === imageURL ? null : imageURL);
    document.body.style.overflow = fullscreenImage ? "auto" : "hidden";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFullscreenImage(null);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-12 px-6">
      <div className="w-full border-2 border-dashed border-gray-400 bg-gray-50 rounded-xl p-8 text-center hover:bg-gray-100 transition-all duration-300 flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-blue-500 text-white text-3xl font-bold rounded flex items-center justify-center shadow-md mb-3">
            <span className="flex items-center justify-center w-full h-full">+</span>
          </div>
          <p className="text-lg font-medium text-gray-700">
            Click to upload images
          </p>
        </label>
      </div>

      {loading && (
        <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mt-6"></div>
      )}

      <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {imageList.map(({ _id, imageURL, originalName, size }) => (
          <div
            key={_id}
            className="relative bg-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={imageURL}
              alt={originalName}
              className="w-full h-64"
              onClick={() => toggleFullscreen(imageURL)}
            />
            <p className="px-4 py-2 text-center text-gray-900 font-semibold">
              {originalName}
            </p>
            <p className="px-4 py-2 text-center text-gray-900 font-semibold">
              Image size: {(size / 1024).toFixed(2) + " KB"}
            </p>
          </div>
        ))}
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => toggleFullscreen(null)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen Image"
            className="w-auto h-auto max-w-full max-h-full"
          />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default ImageGallery;
