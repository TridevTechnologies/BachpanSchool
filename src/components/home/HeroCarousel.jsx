import React, { useEffect, useState } from "react";
import "../styles/HeroCarousel.css";
import EnrollmentForm from "../shared/EnrollmentForm";

const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
const BANNER_FOLDER = "Banner";

function HeroCarousel({ setEnrollmentOpen }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (bannerImages.length > 0) {
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

  if (loading) {
    return <div className="hero-carousel-loading">Loading...</div>;
  }

  if (bannerImages.length === 0) {
    return <div className="hero-carousel-error">No images available</div>;
  }

  return (
    <div className="hero-section">
      <div className="hero-image-container">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={image.url} alt={image.alt} />
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

      <EnrollmentForm isOpen={isEnrollmentOpen} onClose={handleEnrollmentClose} />
    </div>
  );
}

export default HeroCarousel;
