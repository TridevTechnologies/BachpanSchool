import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { motion } from "framer-motion";
import "../styles/FullGallery.css";
import { mediaService } from "../../services/imagekit.service";

function FullGallery() {
  const location = useLocation();
  const categories = mediaService.getCategories();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || "campus");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mediaService.fetchGallery(activeCategory).then((data) => {
      if (!isMounted) return;
      setImages(data);
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

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      handleModalClose();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const activeCategoryObj = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <motion.div 
      className="full-gallery-section"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            {activeCategoryObj.label} Gallery
          </motion.h2>
        </div>

        {/* Category Navigation Tabs */}
        <div className="gallery-tabs">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`tab-button ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="gallery-grid">
          {loading
            ? [...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))
            : images.map((image, index) => (
                <motion.div 
                  key={image.id || index} 
                  className="gallery-item"
                  onClick={() => handleImageClick(image)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <LazyLoad height="100%" offset={100}>
                    <img 
                      src={image.url} 
                      alt={image.caption || "Gallery item"} 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover" 
                      }} 
                    />
                  </LazyLoad>
                  <div className="image-caption">
                    {image.caption}
                  </div>
                </motion.div>
              ))
          }
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <motion.div 
            className="image-modal active"
            onClick={handleModalClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button className="modal-close" onClick={handleModalClose}>&times;</button>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="modal-image"
              />
              <div className="modal-caption">
                {selectedImage.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default FullGallery;