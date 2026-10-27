import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gallery.css";
import { FaExpandAlt, FaArrowRight } from "react-icons/fa";
import { mediaService } from "../../services/imagekit.service";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("campus");
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const categories = mediaService.getCategories();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mediaService.fetchGallery(activeCategory).then((data) => {
      if (!isMounted) return;
      setImages((prev) => ({
        ...prev,
        [activeCategory]: data,
      }));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const currentImages = images[activeCategory] || [];

  return (
    <div className="premium-gallery-section" id="gallery">
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

        {/* Category Filter Tabs */}
        <div className="premium-gallery-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`modern-tab ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Gallery Grid */}
        <div className="masonry-gallery-grid">
          {currentImages.map((image, index) => (
            <div 
              key={image.id || index} 
              className={`masonry-item item-size-${(index % 4) + 1}`}
              onClick={() => handleImageClick(image)}
            >
              <div className="masonry-image-wrapper">
                <img 
                  src={image.url} 
                  alt={image.caption || "Gallery item"} 
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <FaExpandAlt className="expand-icon" />
                  <span>{image.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div className="gallery-premium-modal active" onClick={handleModalClose}>
            <div className="modal-stage" onClick={(e) => e.stopPropagation()}>
              <button className="close-stage" onClick={handleModalClose}>&times;</button>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
              />
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
