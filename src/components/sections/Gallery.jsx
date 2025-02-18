import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";

const IMAGEKIT_URL = "https://ik.imagekit.io/vbjia17nu/";
const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
const GALLERY_CATEGORIES = [
  { id: "campus", label: "Campus", path: "Gallery/Campus" },
  { id: "events", label: "Events", path: "Gallery/Events" },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("campus");
  const [images, setImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GALLERY_CATEGORIES.forEach((category) => {
      fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(category.path)}`, {
        headers: {
          Authorization: "Basic " + btoa(`${PRIVATE_API_KEY}:`),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setImages((prev) => ({
              ...prev,
              [category.id]: data.slice(0, 3).map((file) => ({
                url: file.url,
                caption: file.name,
              })),
            }));
          }
        })
        .catch((err) => console.error(`Error fetching ${category.label}:`, err));
    });
  }, []);

  return (
    <div className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>School Gallery</h2>
          <p>Glimpses of life at Bachpan Height School</p>
        </div>

        <div className="gallery-tabs">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`tab-button ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {(images[activeCategory] || []).map((image, index) => (
            <div key={index} className="gallery-item" onClick={() => setSelectedImage(image)}>
              <img src={image.url} alt={image.caption} />
              <div className="image-caption">
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="view-all-button" onClick={() => navigate("/full-gallery")}>View All Images</button>

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content">
              <img src={selectedImage.url} alt={selectedImage.caption} />
              <p>{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
