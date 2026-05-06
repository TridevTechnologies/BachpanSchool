import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";
import { FaExpandAlt, FaArrowRight } from "react-icons/fa";

const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
const GALLERY_CATEGORIES = [
  { id: "campus", label: "Campus Life", path: "Gallery/Campus" },
  { id: "events", label: "Special Events", path: "Gallery/Events" },
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
              [category.id]: data.slice(0, 6).map((file) => ({
                url: file.url,
                caption: file.name.replace(/\.[^/.]+$/, ""),
              })),
            }));
          }
        })
        .catch((err) => console.error(`Error fetching ${category.label}:`, err));
    });
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="premium-gallery-section">
      <div className="container">
        <div className="gallery-header-flex">
          <div className="header-left">
            <span className="premium-label">Our Memories</span>
            <h2>Glimpses of <span>Excellence</span></h2>
            <p>Capturing the vibrant moments and academic milestones of our students.</p>
          </div>
          <button className="premium-view-all-btn" onClick={() => navigate("/full-gallery")}>
            View All Collection <FaArrowRight />
          </button>
        </div>

        <div className="premium-gallery-tabs">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`modern-tab ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="masonry-gallery-grid">
          {(images[activeCategory] || []).map((image, index) => (
            <div 
              key={index} 
              className={`masonry-item item-size-${(index % 4) + 1}`}
              onClick={() => handleImageClick(image)}
            >
              <div className="masonry-image-wrapper">
                <img src={image.url} alt={image.caption} loading="lazy" />
                <div className="masonry-overlay">
                  <FaExpandAlt className="expand-icon" />
                  <span>{image.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="gallery-premium-modal active" onClick={handleModalClose}>
            <div className="modal-stage" onClick={(e) => e.stopPropagation()}>
              <button className="close-stage" onClick={handleModalClose}>&times;</button>
              <img src={selectedImage.url} alt={selectedImage.caption} />
              <div className="modal-info-bar">
                <h3>{selectedImage.caption}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
