import React, { useEffect, useState, useCallback } from "react";
import "../styles/HeroCarousel.css";
import EnrollmentForm from "../shared/EnrollmentForm";

const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
const BANNER_FOLDER = "Banner";

function HeroCarousel({ setEnrollmentOpen }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesReady, setImagesReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  useEffect(() => {
    fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(BANNER_FOLDER)}`, {
      headers: {
        Authorization: "Basic " + btoa(`${PRIVATE_API_KEY}:`),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const imagesArray = Array.isArray(data) ? data : data.results || [];
        const formattedImages = imagesArray.map((file) => ({
          url: file.url,
          alt: file.name || "Banner image",
        }));
        setBannerImages(formattedImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching banner images:", err);
        setLoading(false);
      });
  }, []);

  // Mark images as ready once at least the first image loads
  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => {
      const next = prev + 1;
      if (next >= 1) setImagesReady(true);
      return next;
    });
  }, []);

  useEffect(() => {
    if (bannerImages.length > 0 && imagesReady) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerImages, imagesReady]);

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

  // Show skeleton while API is loading OR images haven't rendered yet
  const showSkeleton = loading || (!imagesReady && bannerImages.length > 0);

  return (
    <div className="hero-carousel-root">
      {/* Skeleton Loader */}
      {showSkeleton && (
        <div className="hero-skeleton">
          <div className="skeleton-image-area">
            <div className="skeleton-shimmer"></div>
            <div className="skeleton-logo-pulse"></div>
          </div>
          <div className="skeleton-action-bar">
            <div className="skeleton-text-group">
              <div className="skeleton-line skeleton-line-lg"></div>
              <div className="skeleton-line skeleton-line-md"></div>
            </div>
            <div className="skeleton-btn-placeholder"></div>
          </div>
        </div>
      )}

      {/* Actual Carousel (hidden until images ready) */}
      <div className={`hero-carousel-content ${imagesReady ? "hero-loaded" : "hero-hidden"}`}>
        <div className="hero-image-container">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img src={image.url} alt={image.alt} onLoad={handleImageLoad} />
            </div>
          ))}
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
        </div>

        <div className="hero-text-container">
          <div className="hero-text-content">
            <h1>Give Your Child the Best Start at Bachpan & Academic Heights Public School</h1>
            <p>Empowering futures with excellence and care</p>
            <button className="apply-now-btn" onClick={handleApplyNow}>
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {bannerImages.length === 0 && !loading && (
        <div className="hero-carousel-error">No images available</div>
      )}

      <EnrollmentForm isOpen={isEnrollmentOpen} onClose={handleEnrollmentClose} />
    </div>
  );
}

export default HeroCarousel;

