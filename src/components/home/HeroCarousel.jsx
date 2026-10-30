import React, { useEffect, useState, useCallback } from "react";
import "../styles/HeroCarousel.css";
import EnrollmentForm from "../shared/EnrollmentForm";
import { mediaService } from "../../services/imagekit.service";

function HeroCarousel({ setEnrollmentOpen }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesReady, setImagesReady] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    mediaService.fetchBanners().then((images) => {
      if (!isMounted) return;
      setBannerImages(images);
      setLoading(false);
      if (images.length > 0) {
        setImagesReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageLoad = useCallback(() => {
    setImagesReady(true);
  }, []);

  useEffect(() => {
    if (bannerImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerImages]);

  const handleApplyNow = () => {
    setIsEnrollmentOpen(true);
    if (setEnrollmentOpen) {
      setEnrollmentOpen(true);
    }
  };

  const handleEnrollmentClose = () => {
    setIsEnrollmentOpen(false);
    if (setEnrollmentOpen) {
      setEnrollmentOpen(false);
    }
  };

  return (
    <div className="hero-carousel-root">
      {loading && (
        <div className="hero-skeleton">
          <div className="skeleton-image-area">
            <div className="skeleton-shimmer"></div>
            <div className="skeleton-logo-pulse"></div>
          </div>
        </div>
      )}

      {!loading && bannerImages.length > 0 && (
        <div className={`hero-carousel-content ${imagesReady ? "hero-loaded" : ""}`}>
          <div className="hero-image-container">
            {bannerImages.map((image, index) => (
              <div
                key={image.id || index}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
              >
                <img 
                  src={image.url} 
                  alt={image.alt || "School Banner"} 
                  onLoad={handleImageLoad}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
            
            {bannerImages.length > 1 && (
              <div className="carousel-dots">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Temporarily commented out: Apply Now action bar
          <div className="hero-text-container">
            <div className="hero-text-content">
              <h1>Give Your Child the Best Start at Bachpan & Academic Heights Public School</h1>
              <p>Empowering futures with excellence and care</p>
              <button className="apply-now-btn" onClick={handleApplyNow}>
                Apply Now
              </button>
            </div>
          </div>
          */}
        </div>
      )}

      <EnrollmentForm isOpen={isEnrollmentOpen} onClose={handleEnrollmentClose} />
    </div>
  );
}

export default HeroCarousel;
