import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { motion } from "framer-motion";
import "../styles/FullGallery.css";


const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4="; // ⚠️ Exposed Key (Not Secure)
const GALLERY_CATEGORIES = [
  { id: "campus", label: "Campus", path: "Gallery/Campus" },
  { id: "events", label: "Events", path: "Gallery/Events" },
];

function FullGallery() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || "campus");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(GALLERY_CATEGORIES.find(cat => cat.id === activeCategory).path)}`, {
      headers: {
        Authorization: "Basic " + btoa(`${PRIVATE_API_KEY}:`),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data.map((file) => ({
            url: file.url,
            caption: file.name,
          })));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching ${activeCategory} images:`, err);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <motion.div 
      className="full-gallery-section"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="header" style={{ justifyContent: "center", marginTop: "3rem" }}>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
          >
            {GALLERY_CATEGORIES.find(cat => cat.id === activeCategory).label} Gallery
          </motion.h2>
        </div>

        <div className="gallery-tabs">
          {GALLERY_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`tab-button ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.1 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: images.length === 1 ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))", justifyItems: "center" }}>
          {loading
            ? [...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                ></motion.div>
              ))
            : images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ width: images.length === 1 ? "300px" : "100%", aspectRatio: "1 / 1" }}
                >
                  <LazyLoad height={200} offset={100}>
                    <img src={image.url} alt={image.caption} style={{ objectFit: "cover" }} />
                  </LazyLoad>
                  <div className="image-caption">{image.caption}</div>
                </motion.div>
              ))
          }
        </div>

        {selectedImage && (
          <motion.div 
            className="image-modal" 
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <img src={selectedImage.url} alt={selectedImage.caption} />
              <p>{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default FullGallery;
